namespace CES.Infra.Models.Men
{
    public class NoteEntity
    {
        public int Id { get; set; }

        public string? Description { get; set; }

        public DateTime Date { get; set; }

        public bool IsChecked { get; set; }
    }
}
