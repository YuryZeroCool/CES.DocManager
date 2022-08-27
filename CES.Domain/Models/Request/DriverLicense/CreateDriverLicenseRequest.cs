using CES.Domain.Models.Response;
using CES.Domain.Models.Response.DriverLicense;
using MediatR;

namespace CES.Domain.Models.Request.DriverLicense
{
    public class CreateDriverLicenseRequest : BaseModelEmployee, IRequest<GetDriverLicenseResponse>
    {
        public string? SerialNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string? Category { get; set; }

        public int EmployeeId { get; set; }
    }
}
