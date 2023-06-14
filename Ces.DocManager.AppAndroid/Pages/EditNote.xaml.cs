using Ces.DocManager.AppAndroid.ViewModels;

namespace Ces.DocManager.AppAndroid.Pages;

public partial class EditNote : ContentPage
{
	public readonly EditNoteViewModel _editNote;

	public EditNote(EditNoteViewModel editNoteView)
	{
		InitializeComponent();
		_editNote = editNoteView;
        this.BindingContext = _editNote;
    }


}