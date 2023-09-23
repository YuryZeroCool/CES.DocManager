namespace CES.Infra.Models.Mes
{
    public class PriceOfWorkInActEntity
    {
        public int Id { get; set; }

        public decimal Price { get; set; }
        public List<WorkNameInActEntity> WorksNamesInActEntity { get; set; } = new();
    }
}
