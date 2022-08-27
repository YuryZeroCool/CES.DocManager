namespace CES.Infra.Models.MaterialReport
{
    public class UnitEntity
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public ICollection<ProductEntity>? Products { get; set; }
    }
}
