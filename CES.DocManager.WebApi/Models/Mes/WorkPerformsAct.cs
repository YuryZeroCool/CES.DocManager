namespace CES.DocManager.WebApi.Models.Mes
{
    public class WorkPerformsAct
    {
        public string Name { get; set; } = string.Empty;

        public string Unit { get; set; } = string.Empty;

        public decimal Count { get; set; }

        public decimal Price { get; set; }

        public decimal TotalSum { get; set; }

    }
}
