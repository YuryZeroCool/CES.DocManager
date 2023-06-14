using Ces.DocManager.AppAndroid.ViewModels;

namespace Ces.DocManager.AppAndroid.Pages
{
    public partial class HomePage : ContentPage
    {
        private HomeViewModel _homeViewModel;
        public HomePage(HomeViewModel homeViewModel)
        {
            InitializeComponent();
            _homeViewModel = homeViewModel;
            this.BindingContext = _homeViewModel;

        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            _homeViewModel.GetNoteListCommand.Execute(null);
        }
    }
}
