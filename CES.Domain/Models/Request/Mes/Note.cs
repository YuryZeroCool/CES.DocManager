namespace CES.Domain.Models.Request.Mes
{
    public class Note
    {
        public int Id { get; set; }

        public string? Comment { get; set; }

        public DateTime Date { get; set; }

        public bool IsChecked { get; set; }
    }
}
