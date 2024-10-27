using CES.DocManager.WebApi.Models.Mes;

namespace CES.DocManager.WebApi.Models
{
    public class EditExistedNoteViewModel : NoteViewModel
    {
        public int Id { get; set; }

        public ContactInfoViewModel[]? NoteContactsInfo { get; set; }
    }
}
