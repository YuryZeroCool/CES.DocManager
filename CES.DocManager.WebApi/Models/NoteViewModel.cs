namespace CES.DocManager.WebApi.Models
{
    public class NoteViewModel
    {
        public int Id { get; set; }

        public string Comment { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public bool IsChecked { get; set; }
    }
}
