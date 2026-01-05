using CES.Infra.Models.Mes;

namespace CES.DocManager.WebApi.Models.Mes
{
    public class ContractViewModel
    {
        public string ContractType { get; set; } = string.Empty;

        public string OrganizationName { get; set; } = string.Empty;

        public string ContractNumber { get; set; } = string.Empty;

        public string CreationDate { get; set; } = string.Empty;

        public string? StartDateOfWork { get; set; }

        public string? EndDateOfWork { get; set; }

        public string? ExpirationDate { get; set; }
    }
}
