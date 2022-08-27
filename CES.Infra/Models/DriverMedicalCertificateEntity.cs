using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class DriverMedicalCertificateEntity
    {
        public int Id { get; set; }

        [Required]
        public string? SerialNumber { get; set; }

        [Required]
        public DateTime IssueDate { get; set; }

        [Required]
        public DateTime ExpiryDate { get; set; }

        public int EmployeeId { get; set; }

        [JsonIgnore]
        public EmployeeEntity? Employee { get; set; }
    }
}
