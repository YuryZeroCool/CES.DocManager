using CES.Domain.Models.Response;
using CES.Domain.Models.Response.Employees;
using MediatR;

namespace CES.Domain.Models.Request.DriverMedicalCertificate
{
    public class CreateMedicalCertificateRequest : BaseModelDocument, IRequest<GetEmployeesByDivisionResponse>
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public int EmployeeId { get; set; }
    }
}
