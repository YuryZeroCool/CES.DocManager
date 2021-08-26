using CES.DocManger.WebApi.Models.Response.Employees;
using System;

namespace CES.DocManger.WebApi.Models.Request
{
    public class EmployeeView:EmployeeFirstLastName
    {
   
        public string DivisionNumber { get; set; }

        public int PersonnelNumber { get; set; }

        public DateTime BthDate { get; set; }
    }
}
