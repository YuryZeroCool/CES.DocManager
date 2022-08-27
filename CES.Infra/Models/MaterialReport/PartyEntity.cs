namespace CES.Infra.Models.MaterialReport
{
    public class PartyEntity
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public DateTime PartyDate { get; set; }

        public decimal Price { get; set; }

        public double Count { get; set; }

        public DateTime DateCreated { get; set; }

        public int ProductId { get; set; }

        public ProductEntity? Product { get; set; }

    }
}
