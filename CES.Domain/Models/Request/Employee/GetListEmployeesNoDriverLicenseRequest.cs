using CES.Domain.Models.Response.Employees;
using MediatR;

namespace CES.Domain.Models.Request.Employee
{
    public class GetListEmployeesNoDriverLicenseRequest : IRequest<IEnumerable<GetEmployeesByDivisionResponse>> { }
}
