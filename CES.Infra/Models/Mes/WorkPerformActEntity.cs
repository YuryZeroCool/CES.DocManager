namespace CES.Infra.Models.Mes
{
    public class WorkPerformActEntity
    {
        public Guid Id { get; set; }

        public WorkNameInActEntity Name { get; set; }

        public PriceOfWorkInActEntity Price { get; set; }

        public decimal Count { get; set; }

        public ActEntity Act { get; set; }
    }
}
