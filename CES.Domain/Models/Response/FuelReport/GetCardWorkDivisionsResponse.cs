namespace CES.Domain.Models.Response.Report
{
    public class GetCardWorkDivisionsResponse
    {
        public int Id { get; set; }

        public int MileagePerMonth { get; set; }

        public double fuelPerMonth { get; set; }

        public int SumMileage { get; set; }

        public double SumFuel { get; set; }
    }
}
