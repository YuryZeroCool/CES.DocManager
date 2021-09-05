using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CES.DocManger.WebApi.Models.Response.DriverLicense
{
    public class DriverLicense
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string SerialNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string Category { get; set; }
    }
}
