using Ces.DocManager.AppAndroid.Models;
using Ces.DocManager.AppAndroid.Models.ViewModels;
using Ces.DocManager.AppAndroid.Pages;
using Ces.DocManager.AppAndroid.Services;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;
using System.Diagnostics;

namespace Ces.DocManager.AppAndroid.ViewModels
{
    public partial class HomeViewModel : ObservableObject
    {
        public  ObservableCollection<NoteViewModel> NotesList { get; set; } = new ObservableCollection<NoteViewModel>();
  
        public  INoteService _noteService;

        [ObservableProperty]
        private bool isSpinnerRunning = false;

        public HomeViewModel(INoteService noteService)
        {
            _noteService = noteService;
        }

        private void MapNoteList(List<NoteModel> notes)
        {
            var index = 1;

            foreach (var note in notes)
            {
                NotesList.Add(new()
                {
                    Id = note.Id,
                    Comment = note.Comment,
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
                Comment = note.Comment,
                Date = note.Date,
                IsChecked = note.IsChecked,
            };
        }
   
        [RelayCommand]
        public async Task SearchNotes()
        {
            var navParam = new Dictionary<string, object>();
            navParam.Add("Note", new SearchModel()
            {
                MinDate = DateTime.Now,
                MaxDate = DateTime.Now,
            });
            await Shell.Current.GoToAsync(nameof(SearchNote), navParam);
        }
        [RelayCommand]
        public async Task GetNoteList()
        {
            NotesList.Clear();
            MapNoteList(await _noteService.GetNotesFromFile());
        }

        [RelayCommand]
        public async Task AddNotesAsync() 
        {
            var navParam = new Dictionary<string, object>();
            navParam.Add("NoteDetail", new CreateNoteModel()
            {
                Date = DateTime.Now,
                Time = TimeSpan.Parse(DateTime.Now.ToLongTimeString().Split(" ")[0])
            });
            await Shell.Current.GoToAsync(nameof(CreateNote), navParam);
        }

        [RelayCommand]
        public async Task  CompletedNote(NoteViewModel noteModel)
        {
            await _noteService.SaveCompletedNote(noteModel);
            NotesList.Clear();
            MapNoteList(_noteService.GetNotes());
        }

        [RelayCommand]
        public async void DisplayAction(NoteViewModel noteModel)
        {
            string action = await Application.Current.MainPage.DisplayActionSheet("Выбрать", "Отмена", null, "Копировать", "Редактировать", "Отправить", "Удалить");
            switch (action)
            {
                case "Копировать":
                    await Clipboard.Default.SetTextAsync(noteModel.Comment);
                    await Application.Current.MainPage.DisplayAlert("Уведомление", "Скопировано успешно", "ОK");
                    break;
                case "Редактировать":
                    var navParam = new Dictionary<string, object>();
                    navParam.Add("NoteDetail", new CreateNoteModel()
                    {
                        Id = noteModel.Id,
                        Comment = noteModel.Comment,
                        Date = noteModel.Date,
                        Time = TimeSpan.Parse(noteModel.Date.ToLongTimeString().Split(" ")[0])
                    });
                    await Shell.Current.GoToAsync(nameof(CreateNote), navParam);
                    break;
                case "Отправить":
                    try
                    {
                        IsSpinnerRunning = !IsSpinnerRunning;
                        await _noteService.SendNoteToDb(noteModel);
                        NotesList.Clear();
                        MapNoteList(_noteService.GetNotes());
                        IsSpinnerRunning = !IsSpinnerRunning;
                    }
                    catch (TaskCanceledException)
                    {
                        IsSpinnerRunning = !IsSpinnerRunning;
                        await Application.Current.MainPage.DisplayAlert("Уведомление", "Сервер недоступен", "ОK");
                    }
                    catch (Exception e)
                    {
                        IsSpinnerRunning = !IsSpinnerRunning;
                        await Application.Current.MainPage.DisplayAlert("Уведомление", e.Message, "ОK");
                    }
                    break;
                case "Удалить":
                    await _noteService.DeleteNoteFromFile(MapNote(noteModel));
                    NotesList.Clear();
                    MapNoteList(_noteService.GetNotes());
                    break;
            }
        }
    }
}
