using Ces.DocManager.AppAndroid.Models.ViewModels;
using Ces.DocManager.AppAndroid.Services;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace Ces.DocManager.AppAndroid.ViewModels
{
    [QueryProperty(nameof(NoteDetail), "NoteDetail")]

    public partial class EditNoteViewModel : ObservableObject
    {
        private INoteService _noteService;

        [ObservableProperty]
        private EditModel noteDetail = new();

        private EditModel _note = new();

        public EditNoteViewModel(INoteService noteService)
        {
            _noteService = noteService;
            _note.Description = noteDetail.Description;
            _note.IsChecked = noteDetail.IsChecked;
            _note.Date = noteDetail.Date;
        }

        [RelayCommand]
        public async Task EditNote()
        {
            if (NoteDetail.Description != null && NoteDetail.Description.Trim() != "")
            {
                if (_note.Date == NoteDetail.Date )
                {
                    NoteDetail.Date = default(DateTime);
                } else
                {
                    NoteDetail.Date = new DateTime(
                    NoteDetail.Date.Year,
                    NoteDetail.Date.Month,
                    NoteDetail.Date.Day,
                    NoteDetail.Time.Hours,
                    NoteDetail.Time.Minutes,
                    NoteDetail.Time.Seconds
                    );
                };

                if (_note.Description == NoteDetail.Description)
                {
                    NoteDetail.Description = null;
                }
                else
                {
                    NoteDetail.Description = NoteDetail.Description.Trim();
                };

                await _noteService.EditNote(NoteDetail);
                NoteDetail = null;
                await Shell.Current.GoToAsync("..");
            }
        }
    }
}
