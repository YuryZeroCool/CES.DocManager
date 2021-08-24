using System;
using CES.DocManger.WebApi.Models.Request;

namespace CES.DocManger.WebApi.Models.Response
{
    public class EmployeeViewModel : UpdateEmployeeViewModel
    {
        public int Id { get; set; }
    }
}
