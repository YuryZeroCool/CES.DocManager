using System;
namespace CES.Domain.Models.Response.Employees
{
    public class GetAllEmployeeResponse : BaseModelEmployee
    {
        public int PersonnelNumber { get; set; }

        public DateTime BthDate { get; set; }

        public string DivisionNumber { get; set; }

        public string SerialNumberDriverLicense { get; set; }

        public DateTime IssueDateDriverLicense { get; set; }

        public DateTime ExpiryDateDriverLicense { get; set; }

        public string Category { get; set; }

        public string NumberMedicalCertificate { get; set; }

        public DateTime IssueDateMedicalCertificate { get; set; }

        public DateTime ExpiryDateMedicalCertificate { get; set; }
    }
}
