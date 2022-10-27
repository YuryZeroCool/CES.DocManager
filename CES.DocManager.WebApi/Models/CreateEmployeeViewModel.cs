namespace CES.DocManager.WebApi.Models
{
    public class CreateEmployeeViewModel
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public DateTime DateBirth { get; set; }

        public string? DivisionNumber { get; set; }

        public int PersonnelNumber { get; set; }
    }
}
