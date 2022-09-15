namespace CES.Domain.Models.Response.Report
{
    public class CreateCardWorkDivisionDateResponse
    {
        public int Id { get; set; }

        public string? DivisionName { get; set; }

        public ICollection<string>? WorkDivisionDates { get; set; }
    }
}
