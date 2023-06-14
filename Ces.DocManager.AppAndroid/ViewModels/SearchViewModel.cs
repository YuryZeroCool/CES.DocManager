using Ces.DocManager.AppAndroid.Models;
using Ces.DocManager.AppAndroid.Models.ViewModels;
using Ces.DocManager.AppAndroid.Pages;
using Ces.DocManager.AppAndroid.Services;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;

namespace Ces.DocManager.AppAndroid.ViewModels
{
    [QueryProperty(nameof(Note), "Note")]
    public partial class SearchViewModel : ObservableObject
    {
        private INoteService _noteService;

        public ObservableCollection<NoteViewModel> NotesList { get; set; } = new ObservableCollection<NoteViewModel>();

        [ObservableProperty]
        private bool isSpinnerRunning = false;

        [ObservableProperty]
        private SearchModel note = new();

        public SearchViewModel(INoteService noteService)
        {
            _noteService = noteService;
        }
        [RelayCommand]
        public async Task GetAllNoteAsync()
        {
            try
            {
                Remove();
                IsSpinnerRunning = !IsSpinnerRunning;
                MapNoteList(await _noteService.GetAllNotes(Note));
                IsSpinnerRunning = !IsSpinnerRunning;
            }
            catch (Exception)
            {
                IsSpinnerRunning = !IsSpinnerRunning;
                await Application.Current.MainPage.DisplayAlert("Уведомление", "Сервер недоступен", "ОK");
            }
        }

        public void Remove()
        {
            NotesList.Clear();
        }

        [RelayCommand]
        public async void DisplayAction(NoteViewModel noteModel)
        {
            string action = await Application.Current.MainPage.DisplayActionSheet("Выбрать", "Отмена", null, "Редактировать", "Удалить");
            switch (action)
            {
                case "Редактировать":
                    var navParam = new Dictionary<string, object>();
                    navParam.Add("NoteDetail", new EditModel()
                    {
                        Id = noteModel.Id,
                        Description = noteModel.Description,
                        Date = noteModel.Date,
                        Time = TimeSpan.Parse(noteModel.Date.ToLongTimeString().Split(" ")[0])
                    });
                    await Shell.Current.GoToAsync(nameof(EditNote), navParam);
                    break;
                case "Удалить":
                    await _noteService.DeleteNoteAsync(MapNote(noteModel));
                    NotesList.Clear();
                    MapNoteList(_noteService.GetNotes());
                    break;
            }
        }

        private void MapNoteList(List<NoteModel> notes)
        {
            var index = 1;

            foreach (var note in notes)
            {
                NotesList.Add(new()
                {
                    Id = note.Id,
                    Description = note.Description,
                    Date = note.Date,
                    IsChecked = note.IsChecked,
                    Counter = index++,
                });
            };
        }
        private NoteModel MapNote(NoteViewModel note)
        {
            return new NoteModel()
            {
                Id = note.Id,
                Description = note.Description,
                Date = note.Date,
                IsChecked = note.IsChecked,
            };
        }
    }
}
