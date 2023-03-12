namespace CES.Domain.Models.Response.FuelReport
{
    public class WorkCardsResponse
    {
        public int Id { get; set; }

        public string? Division { get; set; }

        public int MileagePerMonth { get; set; }

        public double FuelPerMonth { get; set; }

    }
}
