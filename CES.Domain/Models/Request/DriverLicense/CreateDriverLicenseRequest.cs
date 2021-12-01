using MediatR;
using System;

namespace CES.Domain.Models.Request.DriverLicense
{
    public class CreateDriverLicenseRequest : BaseModelEmployee, IRequest
    {
        public string SerialNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string Category { get; set; }

        public int EmployeeId { get; set; }
    }
}
