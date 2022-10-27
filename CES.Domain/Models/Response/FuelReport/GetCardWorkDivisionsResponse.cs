namespace CES.Domain.Models.Response.Report
{
    public class GetCardWorkDivisionsResponse
    {
        public int Id { get; set; }

        public int MileagePerMonthDivision1 { get; set; }

        public int MileagePerMonthDivision2 { get; set; }

        public int MileagePerMonthDivision3 { get; set; }

        public int MileagePerMonthDivision4 { get; set; }


        public double FuelPerMonthDivision1 { get; set; }

        public double FuelPerMonthDivision2 { get; set; }

        public double FuelPerMonthDivision3 { get; set; }

        public double FuelPerMonthDivision4 { get; set; }


        public int SumMileage { get; set; }

        public double SumFuel { get; set; }
    }
}
