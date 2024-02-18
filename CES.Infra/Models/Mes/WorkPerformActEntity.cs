namespace CES.Infra.Models.Mes
{
    public class WorkPerformActEntity
    {
        public Guid Id { get; set; }

        public WorkNameInActEntity Name { get; set; }

        public decimal Count { get; set; }

        public List<ActEntity> Acts { get; set; } = new();
    }
}
