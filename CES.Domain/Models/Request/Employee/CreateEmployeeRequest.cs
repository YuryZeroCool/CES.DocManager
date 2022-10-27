using CES.Domain.Models.Response.Employees;
using MediatR;

namespace CES.Domain.Models.Request.Employee
{
    public class CreateEmployeeRequest : IRequest<CreateEmployeeResponse>
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public int PersonnelNumber { get; set; }

        public DateTime DateBirth { get; set; }

        public string? DivisionNumber { get; set; }
    }
}

