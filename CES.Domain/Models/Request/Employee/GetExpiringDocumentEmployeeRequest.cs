
using System.Collections.Generic;
using CES.Domain.Models.Response.Employees;
using MediatR;

namespace CES.Domain.Models.Request.Employee
{
    public class GetExpiringDocumentEmployeeRequest : IRequest<IEnumerable<ExpiringDocumentEmployeeResponse>>
    {
        public string nameDocument = "DriverLicense";
        public  int  numberMonth { get; set; }
    }
}
