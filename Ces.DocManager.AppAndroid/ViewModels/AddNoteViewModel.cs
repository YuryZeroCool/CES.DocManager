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
                if (NoteDetail.Description != null && NoteDetail.Description.Trim() != "")
                {
                    await _noteService.UpdateNoteAsync(new NoteModel()
                    {
                        Id = NoteDetail.Id,
                        Description = NoteDetail.Description.Trim(),
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
                if (NoteDetail.Description != null && NoteDetail.Description.Trim() != "")
                {
                    await _noteService.InsertAsync(new NoteModel()
                    {
                        Description = NoteDetail.Description.Trim(),
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
