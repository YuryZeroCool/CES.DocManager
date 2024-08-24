namespace CES.Domain.Models.Response.MaterialReport
{
    public class AddMaterialResponse
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int UnitId { get; set; }

        public int ProductGroupAccountId { get; set; }

        public string PartyName { get; set; } = string.Empty;

        public string PartyDate { get; set; } = string.Empty;

        public double Count { get; set; }

        public decimal Price { get; set; }

        public decimal TotalSum { get; set; }
    }
}