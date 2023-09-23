using Ces.DocManager.AppAndroid.Models;
using Ces.DocManager.AppAndroid.Services;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
namespace Ces.DocManager.AppAndroid.ViewModels
{
    [QueryProperty(nameof(NoteDetail), "NoteDetail")]
    public partial class AddNoteViewModel : ObservableObject
    {
        private INoteService _noteService;

        [ObservableProperty]
        private CreateNoteModel noteDetail = new();

        public AddNoteViewModel(INoteService noteService)
        {    
            _noteService = noteService;
        }

        [RelayCommand]
        public async Task Create()
        {
            if (NoteDetail.Id > 0)
            {
                if (NoteDetail.Comment != null && NoteDetail.Comment.Trim() != "")
                {
                    await _noteService.UpdateNoteInFile(new NoteModel()
                    {
                        Id = NoteDetail.Id,
                        Comment = NoteDetail.Comment.Trim(),
                        Date = new DateTime(
                        NoteDetail.Date.Year,
                        NoteDetail.Date.Month,
                        NoteDetail.Date.Day,
                        NoteDetail.Time.Hours,
                        NoteDetail.Time.Minutes,
                        NoteDetail.Time.Seconds
                        )
                    });
                    NoteDetail = null;
                    await Shell.Current.GoToAsync("..");
                }
            }
            if (NoteDetail == null) return;
            if (NoteDetail.Id == 0)
            {
                if (NoteDetail.Comment != null && NoteDetail.Comment.Trim() != "")
                {
                    await _noteService.InsertNoteToFile(new NoteModel()
                    {
                        Comment = NoteDetail.Comment.Trim(),
                        Date = new DateTime(
                        NoteDetail.Date.Year,
                        NoteDetail.Date.Month,
                        NoteDetail.Date.Day,
                        NoteDetail.Time.Hours,
                        NoteDetail.Time.Minutes,
                        NoteDetail.Time.Seconds
                        )
                    });
                    NoteDetail = null;
                    await Shell.Current.GoToAsync("..");
                }
            }
        }
    }
}
