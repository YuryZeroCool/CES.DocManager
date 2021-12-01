using CES.Domain.Models.Response.Employees;
using MediatR;
using System.Collections.Generic;

namespace CES.Domain.Models.Request.Employee
{
    public class GetEmployeeFullNameRequest : IRequest<IEnumerable<GetEmployeeFullNameResponse>>
    {
        public string divisionNumber { get; set; }
    }
}
