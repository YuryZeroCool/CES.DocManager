using System;
using CES.Domain.Models.Response;
using MediatR;

namespace CES.Domain.Models.Request.DriverMedicalCertificate
{
    public class CreateMedicalCertificateRequest : BaseModelDocument, IRequest
    {
        public string FirstName { get; set; }

        public  string LastName { get; set; }
        
        public int EmployeeId { get; set; }
    }
}
