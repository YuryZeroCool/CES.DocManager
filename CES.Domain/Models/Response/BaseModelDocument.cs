namespace CES.Domain.Models.Response
{
    public class BaseModelDocument
    {
        public string? SerialNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime ExpiryDate { get; set; }
    }
}
