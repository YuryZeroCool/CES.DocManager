using Ces.DocManager.AppAndroid.ViewModels;
namespace Ces.DocManager.AppAndroid.Pages;

public partial class SearchNote : ContentPage
{
    private SearchViewModel _search;

    public SearchNote(SearchViewModel search)
	{
		InitializeComponent();
        _search = search;
        this.BindingContext = _search;
    }
    protected override void OnAppearing()
    {
        base.OnAppearing();
        _search.GetAllNoteCommand.Execute(null);
    }

}