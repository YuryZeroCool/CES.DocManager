namespace CES.DocManager.WebApi.Models
{
    public class NoteViewModel
    {
        public int Id { get; set; }

        public string? Description { get; set; }

        public DateTime Date { get; set; }

        public bool IsChecked { get; set; }
    }
}
