namespace Ces.DocManager.AppAndroid.Models
{
    public class NoteModel
    {
        public int Id { get; set; }

        public string Comment { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public bool IsChecked { get; set; }
    }
}
