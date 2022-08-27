using CES.Domain.Models.Response.Employees;
using MediatR;

namespace CES.Domain.Models.Request.Employee
{
    public class GetExpiringDocumentEmployeeRequest : IRequest<IEnumerable<GetExpiringDocumentEmployeeResponse>>
    {
        public string? NameDocument = "DriverLicense";
        public int NumberMonth { get; set; }
    }
}
