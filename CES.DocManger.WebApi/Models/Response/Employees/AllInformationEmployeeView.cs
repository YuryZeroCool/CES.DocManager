using System;

namespace CES.DocManger.WebApi.Models.Response.Employees
{
    public class AllInformationEmployeeView
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int PersonnelNumber { get; set; }

        public DateTime BthDate { get; set; }

        public string DivisionNumber { get; set; }

        public string SerialNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string Category { get; set; }

        public string NumberMedicalCertificate { get; set; }

        public DateTime IssueDateMedicalCertificate { get; set; }

        public DateTime ExpiryDateMedicalCertificate { get; set; }
    }
}
