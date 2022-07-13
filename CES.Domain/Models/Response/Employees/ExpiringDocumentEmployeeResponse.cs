using System;

namespace CES.Domain.Models.Response.Employees
{
    public class ExpiringDocumentEmployeeResponse : BaseModelEmployee
    {
        public DateTime BthDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string DivisionNumber { get; set; }

    }
}
