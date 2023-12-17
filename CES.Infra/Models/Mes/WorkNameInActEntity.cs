using CES.Infra.Models.MaterialReport;

namespace CES.Infra.Models.Mes
{
    public class WorkNameInActEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public DateTime DateOfCreation { get; set; }

        public UnitEntity? Unit { get; set; }
    }
}
