namespace CES.DocManager.WebApi.Models
{
    public class CreateEmployeeViewModel
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public DateTime DateBirth { get; set; }

        public string? Division { get; set; }

        public int PersonNumber { get; set; }
    }
}
