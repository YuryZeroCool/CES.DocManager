using Ces.DocManager.AppAndroid.Models;
using Ces.DocManager.AppAndroid.Models.ViewModels;

namespace Ces.DocManager.AppAndroid.Services
{
    public interface INoteService
    {
        public Task<NoteModel> EditNote(EditModel edit);

        public Task DeleteNoteFromFile(NoteModel note);

        public Task DeleteNoteFromDb(NoteModel note);

        public Task SaveCompletedNote(NoteModel note);

        public Task SendNoteToDb(NoteModel note);

        public Task<List<NoteModel>> GetNotesFromFile();

        public Task UpdateNoteInFile(NoteModel note);

        public Task<List<NoteModel>> ReadFile();

        public Task SaveFile();

        public  Task RemoveNoteFromFile(NoteModel note);

        public Task InsertNoteToFile(NoteModel note);

        public List<NoteModel> GetNotes();

        public Task<List<NoteModel>> GetAllNotes(SearchModel note);

    }
}