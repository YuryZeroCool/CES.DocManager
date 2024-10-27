using System.Text.Json.Serialization;

namespace CES.Infra.Models.Drivers
{
    public class DriverLicenseEntity
    {
        public int Id { get; set; }

        public string? SerialNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string? Category { get; set; }

        public int EmployeeId { get; set; }

        [JsonIgnore]
        public EmployeeEntity? Employee { get; set; }
    }
}
