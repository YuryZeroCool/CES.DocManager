namespace CES.Domain.Models.Response.Report
{
    public class CreateCardWorkDivisionDateResponse
    {
        public int Id { get; set; }

        public string? Division { get; set; }

        public ICollection<string>? Dates { get; set; }
    }
}
