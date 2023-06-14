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

        private readonly string path = "http://localhost:7788"; //

        private HttpClient _httpClient;

        public async Task<NoteModel> EditNote(EditModel edit)
        {
            var jsonDocument = new JsonPatchDocument<EditModel>();
            if(edit.Description != null) jsonDocument.Replace(p => p.Description, edit.Description);
            if (edit.Date != default(DateTime)) jsonDocument.Replace(p => p.Date, edit.Date);
            _httpClient = new HttpClient();
            _httpClient.Timeout = TimeSpan.FromSeconds(10);
            var content = new StringContent(JsonConvert.SerializeObject(jsonDocument), Encoding.UTF8, "application/json-patch+json");

            var response = await _httpClient.PatchAsync($"https://ces-docmanager.site/men/editNote?id={edit.Id}", content);
            if (response == null || response.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception("Не удалось отправить на сервер");
            var json = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<object>(json, JsonSerializerSettings());
            return obj as NoteModel;
        }

        public async Task DeleteNoteAsync(NoteModel note)
        {
            _notes = await ReadFileAsync();
            var res = _notes.Remove(_notes.AsParallel().FirstOrDefault(p => p.Id == note.Id
            && p.Description == note.Description && p.Date == note.Date));
            if (res) await SaveFileAsync();
        }

        public async Task SaveCompletedNote(NoteModel note)
        {
            _notes = await ReadFileAsync();
            foreach (var item in _notes.AsParallel().Where(p => p.Id == note.Id
            && p.Description == note.Description && p.Date == note.Date))
            item.IsChecked = !item.IsChecked;
            await SaveFileAsync();
        }
    
        public async Task AddNoteAsync(NoteModel note)
        {
            _httpClient = new HttpClient();
            _httpClient.Timeout = TimeSpan.FromSeconds(10);
            var response = await _httpClient.PostAsync("https://ces-docmanager.site/men/noteCreate", JsonContent.Create(note));
            if (response == null || response.StatusCode != System.Net.HttpStatusCode.Created ) throw new Exception("Не удалось отправить на сервер");
            await RemoveAsync(note);
        }

        public async Task<List<NoteModel>> GetNotesListAsync() 
        {
           return await ReadFileAsync();
        }

        public async Task UpdateNoteAsync(NoteModel note)
        {
            _notes = await ReadFileAsync();
            foreach (var item in _notes.AsParallel().Where(p => p.Id == note.Id))
            {
                item.Date = note.Date;
                item.Description = note.Description;
            }
             await SaveFileAsync();
        }

        public async Task<List<NoteModel>> ReadFileAsync()
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

        public async Task SaveFileAsync()
        {
            await File.WriteAllTextAsync(Path.Combine(FileSystem.AppDataDirectory, "note.json"),
            JsonConvert.SerializeObject(_notes, JsonSerializerSettings()));
        }
        public async Task RemoveAsync(NoteModel note)
        {
            if (_notes == null || _notes.Count == 0) throw new Exception("Ошибка при удалении файла");
            if (_notes.RemoveAll(x => x.Id == note.Id) == 0) throw new Exception("Ошибка при удалении файла");
            await SaveFileAsync();
        }

        public List<NoteModel> GetNotes() => _notes;
        public async Task InsertAsync(NoteModel note)
        {
            _notes = await ReadFileAsync();
            note.Id = _notes.Count == 0 ? 1 : _notes.AsParallel().Max(x => x.Id) + 1;
            _notes.Add(note);
            await SaveFileAsync();
           // if ( _notes != null) await Task.FromResult(note.Id);
        }

        public async Task<List<NoteModel>> GetAllNotes(SearchModel note)
        {
            _httpClient = new HttpClient();
            _httpClient.Timeout = TimeSpan.FromSeconds(10);
            var response = await _httpClient.GetAsync($"https://ces-docmanager.site/men/getAllNotes?text={note.Description}" +
                $"&min={note.MinDate.ToString("yyyy/MM/dd")}" +
                $"&max={note.MaxDate.ToString("yyyy/MM/dd")}");
            if (response == null || response.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception("Не удалось отправить на сервер");
            var json = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<object>(json, JsonSerializerSettings());
            _notes.Clear();
            if (obj != null)  ((IEnumerable)obj).Cast<object>().ToList().ForEach(x =>
            {
                _notes.Add(JsonConvert.DeserializeObject<NoteModel>(x.ToString()));
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




