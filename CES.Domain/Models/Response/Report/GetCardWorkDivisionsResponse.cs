namespace CES.Domain.Models.Response.Report
{
    public class GetCardWorkDivisionsResponse
    {
        public string? NameCar { get; set; } 

        public string? Division { get; set; }

        public ICollection <FuelWorkCardModel>? Cards { get; set; }
    }
}
