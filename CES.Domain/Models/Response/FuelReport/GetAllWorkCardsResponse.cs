namespace CES.Domain.Models.Response.FuelReport
{
    public class GetAllWorkCardsResponse
    {
        public int Id { get; set; }
        public string? CarNumber { get; set; }

        public List<WorkCardsResponse> WorkCards { get; set; }

        public int SumMileage { get; set; }

        public double SumFuel { get; set; }

        public GetAllWorkCardsResponse()
        {
            WorkCards = new List<WorkCardsResponse>();
        }
    }
}
