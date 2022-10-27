using CES.Domain.Models.Request.Employee;

namespace CES.Domain.Models.Response.Employees
{
    public class CreateEmployeeResponse : CreateEmployeeRequest
    {
        public int Id { get; set; } 
    }
}
