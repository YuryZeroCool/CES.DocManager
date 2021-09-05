using CES.DocManger.WebApi.Models.Response.Employees;
using System;

namespace CES.DocManger.WebApi.Models.Request
{
    public class EmployeeView:EmployeeFirstLastName
    {
        public string DivisionNumber { get; set; }

        public DateTime BirthDate { get; set; }
    }
}
