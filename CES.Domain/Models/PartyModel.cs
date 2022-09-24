namespace CES.Domain.Models
{
    public class PartyModel
    {
        public int PartyId { get; set; }

        public string? PartyName { get; set; }

        public DateTime PartyDate { get; set; }

        public decimal Price { get; set; }

        public double Count { get; set; }
    }
}
