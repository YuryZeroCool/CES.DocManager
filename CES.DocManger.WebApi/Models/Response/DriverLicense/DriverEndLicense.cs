using CES.DocManger.WebApi.Models.Request;
using System;

namespace CES.DocManger.WebApi.Models.Response
{
    public class DriverEndLicense :EmployeeView
    {
        public DateTime ExpiryDate { get; set; }
    }
}
