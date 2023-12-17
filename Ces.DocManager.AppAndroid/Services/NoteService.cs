using AutoMapper;
using Ces.DocManager.AppAndroid.Models;
using Ces.DocManager.AppAndroid.Models.ViewModels;
using Microsoft.AspNetCore.JsonPatch;
using Newtonsoft.Json;
using System.Collections;
using System.Net.Http.Json;
using System.Text;

namespace Ces.DocManager.AppAndroid.Services
{
    public class NoteService : INoteService
    {
        private List<NoteModel> _notes;

        //private readonly string url = "http://localhost:7788/mes/noteCreate"; 
        private string url = "https://ces-docmanager.ru/mes/noteCreate";
        private HttpClient _httpClient;


        private readonly IMapper _mapper;   
        public NoteService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<NoteModel> EditNote(EditModel edit)
        {
            var jsonDocument = new JsonPatchDocument<EditModel>();
            if(edit.Comment != null) jsonDocument.Replace(p => p.Comment, edit.Comment);
            if (edit.Date != default(DateTime)) jsonDocument.Replace(p => p.Date, edit.Date);
            _httpClient = new HttpClient();
            _httpClient.Timeout = TimeSpan.FromSeconds(10);
            var content = new StringContent(JsonConvert.SerializeObject(jsonDocument), Encoding.UTF8, "application/json-patch+json");

            var response = await _httpClient.PatchAsync($"https://ces-docmanager.ru/mes/editNote?id={edit.Id}", content);
            if (response == null || response.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception("Не удалось отправить на сервер");
            var json = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<object>(json, JsonSerializerSettings());
            return obj as NoteModel;
        }

        public async Task DeleteNoteFromFile(NoteModel note)
        {
            _notes = await ReadFile();
            var res = _notes.Remove(_notes.AsParallel().FirstOrDefault(p => p.Id == note.Id
            && p.Comment == note.Comment && p.Date == note.Date));
            if (res) await SaveFile();
        }

        public async Task DeleteNoteFromDb(NoteModel note)
        {
            _httpClient = new HttpClient();
            _httpClient.Timeout = TimeSpan.FromSeconds(10);
            var response = await _httpClient.DeleteAsync($"https://ces-docmanager.ru/mes/deleteNote?id={note.Id}");
            if (response == null || response.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception("Не удалось отправить на сервер");
            var res = _notes.Remove(_notes.AsParallel().FirstOrDefault(p => p.Id == note.Id
            && p.Comment == note.Comment && p.Date == note.Date));
        }

        public async Task SaveCompletedNote(NoteModel note)
        {
            _notes = await ReadFile();
            foreach (var item in _notes.AsParallel().Where(p => p.Id == note.Id
            && p.Comment == note.Comment && p.Date == note.Date))
            item.IsChecked = !item.IsChecked;
            await SaveFile();
        }
    
        public async Task SendNoteToDb(NoteModel note)
        {
            _httpClient = new HttpClient
            {
                Timeout = TimeSpan.FromSeconds(10)
            };
            var d = JsonContent.Create(note);
            var response = await _httpClient.PostAsync(url, JsonContent.Create(note));
            if (response == null || response.StatusCode != System.Net.HttpStatusCode.Created ) throw new Exception("Не удалось отправить на сервер");
            await RemoveNoteFromFile(note);
        }

        public async Task<List<NoteModel>> GetNotesFromFile() 
        {
           return await ReadFile();
        }

        public async Task UpdateNoteInFile(NoteModel note)
        {
            _notes = await ReadFile();
            foreach (var item in _notes.AsParallel().Where(p => p.Id == note.Id))
            {
                item.Date = note.Date;
                item.Comment = note.Comment;
            }
             await SaveFile();
        }

        public async Task<List<NoteModel>> ReadFile()
        {
            var path = Path.Combine(FileSystem.AppDataDirectory, "note.json");
            if(System.IO.File.Exists(path))
            {
                string json = await System.IO.File.ReadAllTextAsync(path);
                _notes = JsonConvert.DeserializeObject<List<NoteModel>>(json, JsonSerializerSettings());
            } 
            else
            {
                System.IO.File.Create(Path.Combine(FileSystem.AppDataDirectory, "note.json"));
            }
            _notes ??= new List<NoteModel>();
            return await Task.FromResult(_notes);
        }

        public async Task SaveFile()
        {
            await File.WriteAllTextAsync(Path.Combine(FileSystem.AppDataDirectory, "note.json"),
            JsonConvert.SerializeObject(_notes, JsonSerializerSettings()));
        }

        public async Task RemoveNoteFromFile(NoteModel note)
        {
            if (_notes == null || _notes.Count == 0) throw new Exception("Ошибка при удалении файла");
            if (_notes.RemoveAll(x => x.Id == note.Id) == 0) throw new Exception("Ошибка при удалении файла");
            await SaveFile();
        }

        public List<NoteModel> GetNotes() => _notes;

        public async Task InsertNoteToFile(NoteModel note)
        {
            _notes = await ReadFile();
            note.Id = _notes.Count == 0 ? 1 : _notes.AsParallel().Max(x => x.Id) + 1;
            _notes.Add(note);
            await SaveFile();
        }

        public async Task<List<NoteModel>> GetAllNotes(SearchModel note)
        {
            _httpClient = new HttpClient();
            _httpClient.Timeout = TimeSpan.FromSeconds(10);
            var response = await _httpClient.GetAsync($"https://ces-docmanager.ru/mes/getSortedNotes?text={note.Comment}" +
                $"&min={note.MinDate:yyyy/MM/dd}" +
                $"&max={note.MaxDate:yyyy/MM/dd}");
            if (response == null || response.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception("Не удалось отправить на сервер");
            var json = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<object>(json, JsonSerializerSettings());
            _notes.Clear();
            if (obj != null)  ((IEnumerable)obj).Cast<object>().ToList().ForEach(x =>
            {
                var res = JsonConvert.DeserializeObject<NoteBase>(x.ToString());
                if (res == null) throw new Exception("Error");
                _notes.Add(_mapper.Map<NoteModel>(res));
            }) ;
            return _notes;
        }

        private JsonSerializerSettings JsonSerializerSettings()
        {
            return new JsonSerializerSettings
            {
                Converters = new List<JsonConverter> { new BoolToStringConverter() },
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
            };
        }
    }
        class BoolToStringConverter : JsonConverter
        {

            public override bool CanConvert(Type objectType)
            {
                return objectType == typeof(bool);
            }

            public override bool CanRead
            {
                get { return true; }
            }

            public override object ReadJson(Newtonsoft.Json.JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
            {
                switch (reader.Value.ToString().ToLower().Trim())
                {
                    case "on":
                        return true;
                    case "off":
                        return false;
                }
                throw new NotImplementedException();
            }

            public override void WriteJson(Newtonsoft.Json.JsonWriter writer, object value, JsonSerializer serializer)
            { 
                writer.WriteValue((bool)value ? "on" : "off");
            }
        }
}




