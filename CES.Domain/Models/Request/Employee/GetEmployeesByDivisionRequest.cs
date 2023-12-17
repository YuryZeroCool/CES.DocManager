﻿using CES.Domain.Models.Response.Employees;
using MediatR;

namespace CES.Domain.Models.Request.Employee
{
    public class GetEmployeesByDivisionRequest : IRequest<IEnumerable<GetEmployeesByDivisionResponse>>
    {
        public string DivisionNumber { get; set; } = string.Empty;
    }
}
