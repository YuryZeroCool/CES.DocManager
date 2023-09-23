namespace CES.Domain.Models
{
    public class Note
    {
        public int Id { get; set; }

        public string? Comment { get; set; }

        public DateTime Date { get; set; }

        public bool IsChecked { get; set; }

       public string? Address { get; set; }

        public string? Tel { get; set; }
    }
}
