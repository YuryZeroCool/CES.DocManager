namespace CES.Domain.Models.Response.Mes.Contracts
{
    public class CreateContractResponse
    {
        public int Id { get; set; }

        public string ContractType { get; set; } = string.Empty;

        public string OrganizationName { get; set; } = string.Empty;

        public string ContractNumber { get; set; } = string.Empty;

        public DateTime CreationDate { get; set; }

        public DateTime? StartDateOfWork { get; set; }

        public DateTime? EndDateOfWork { get; set; }

        public DateTime? ExpirationDate { get; set; }
    }
}
