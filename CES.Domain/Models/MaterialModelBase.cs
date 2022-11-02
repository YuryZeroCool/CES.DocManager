namespace CES.Domain.Models
{
    public abstract class MaterialModelBase
    {
        public string? NameMaterial { get; set; }

        public string? NameParty { get; set; }

        public DateTime PartyDate { get; set; }

        public string? Unit { get; set; }

        public double Count { get; set; }

        public decimal Price { get; set; }
    }
}
