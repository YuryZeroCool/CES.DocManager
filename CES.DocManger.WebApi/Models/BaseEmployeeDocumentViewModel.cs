using System;

namespace CES.DocManger.WebApi.Models
{
    public abstract class BaseEmployeeDocumentViewModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string SerialNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime ExpiryDate { get; set; }
    }
}
