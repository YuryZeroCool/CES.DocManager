using System.Collections.Generic;
using CES.Domain.Models.Response.Employees;
using MediatR;

namespace CES.Domain.Models.Request.Employee
{
    public class ListEmployeesNoDriverLicenseRequest : IRequest<IEnumerable<GetEmployeeFullNameResponse>>
    {
    }
}
