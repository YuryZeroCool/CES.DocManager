using Ces.DocManager.AppAndroid.ViewModels;

namespace Ces.DocManager.AppAndroid.Pages
{
    public partial class CreateNote : ContentPage
    {
        private AddNoteViewModel _addNoteViewModel;

        public CreateNote(AddNoteViewModel addNoteViewModel)
        {
            InitializeComponent();
            _addNoteViewModel = addNoteViewModel;
            this.BindingContext = _addNoteViewModel;
        }
    }
}