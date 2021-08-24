using CES.DocManger.WebApi.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CES.DocManger.WebApi.Models.Response
{
    public class DriverEndLicense : UpdateEmployeeViewModel
    {
      //  public string SerialNumber { get; set; }

       // public DateTime IssueDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        //public string Category { get; set; }
    }
}
