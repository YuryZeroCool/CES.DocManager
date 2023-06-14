namespace CES.Domain.Models.Request.Men
{
    public class Note
    {
        public int Id { get; set; }

        public string? Description { get; set; }

        public DateTime Date { get; set; }

        public bool IsChecked { get; set; }
    }
}
