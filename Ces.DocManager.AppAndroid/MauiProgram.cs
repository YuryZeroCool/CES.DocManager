using Ces.DocManager.AppAndroid.Pages;
using Ces.DocManager.AppAndroid.Services;
using Ces.DocManager.AppAndroid.ViewModels;

namespace Ces.DocManager.AppAndroid
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

            var services = builder.Services;
            services.AddSingleton<INoteService, NoteService>();
            services.AddSingleton<HomePage>();
            services.AddSingleton<CreateNote>();
            services.AddSingleton<SearchNote>();
            services.AddSingleton<EditNote>();


            services.AddSingleton<HomeViewModel>();
            services.AddSingleton<AddNoteViewModel>();
            services.AddSingleton<SearchViewModel>();
            services.AddSingleton<EditNoteViewModel>();
            
            return builder.Build();
        }
    }
}