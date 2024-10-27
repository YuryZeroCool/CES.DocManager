namespace CES.Domain.Models.Response.DriverLicense
{
    public class GetDriverLicenseResponse : BaseModelDocument
    {
        public int Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? PersonnelNumber { get; set; }

        public DateTime BthDate { get; set; }

        public string? DivisionNumber { get; set; }

        public string? Category { get; set; }

    }
}
