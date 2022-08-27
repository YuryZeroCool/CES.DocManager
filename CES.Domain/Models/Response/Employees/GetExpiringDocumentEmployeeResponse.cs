namespace CES.Domain.Models.Response.Employees
{
    public class GetExpiringDocumentEmployeeResponse : BaseModelEmployee
    {
        public DateTime BthDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string? DivisionNumber { get; set; }
    }
}
