namespace CES.Domain.Models.Request.Mes.Organization
{
    public class Organization
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? PayerAccountNumber { get; set; }

        public string? Address { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }
}
