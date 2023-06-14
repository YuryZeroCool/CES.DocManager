using Ces.DocManager.AppAndroid.Models;
using Ces.DocManager.AppAndroid.Models.ViewModels;

namespace Ces.DocManager.AppAndroid.Services
{
    public interface INoteService
    {
        public Task<NoteModel> EditNote(EditModel edit);

        public Task DeleteNoteAsync(NoteModel note);

        public Task SaveCompletedNote(NoteModel note);

        public Task AddNoteAsync(NoteModel note);

        public Task<List<NoteModel>> GetNotesListAsync();

        public Task UpdateNoteAsync(NoteModel note);

        public Task<List<NoteModel>> ReadFileAsync();

        public Task SaveFileAsync();

        public  Task RemoveAsync(NoteModel note);

        public Task InsertAsync(NoteModel note);

        public List<NoteModel> GetNotes();

        public Task<List<NoteModel>> GetAllNotes(SearchModel note);

    }
}