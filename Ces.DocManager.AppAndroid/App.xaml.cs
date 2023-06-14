namespace Ces.DocManager.AppAndroid
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
            if (DeviceInfo.Idiom == DeviceIdiom.Phone)
                Shell.Current.CurrentItem = PhoneTabs;
            Routing.RegisterRoute(nameof(Pages.CreateNote), typeof(Pages.CreateNote));
            Routing.RegisterRoute(nameof(Pages.SearchNote), typeof(Pages.SearchNote));
            Routing.RegisterRoute(nameof(Pages.EditNote), typeof(Pages.EditNote));
        }
    }
}