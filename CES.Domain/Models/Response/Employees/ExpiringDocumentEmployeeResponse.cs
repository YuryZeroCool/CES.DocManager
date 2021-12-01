using System;

namespace CES.Domain.Models.Response.Employees
{
    public class ExpiringDocumentEmployeeResponse : BaseModelEmployee
    {
        public DateTime BthDate { get; set; }

        public DateTime IssueDate { get; set; }

        public string DivisionNumber { get; set; }

    }
}
