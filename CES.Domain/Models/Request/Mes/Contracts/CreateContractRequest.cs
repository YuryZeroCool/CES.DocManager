using CES.Domain.Models.Response.Mes.Contracts;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Contracts
{
    public class CreateContractRequest : IRequest<CreateContractResponse>
    {
        public string ContractType { get; set; } = string.Empty;

        public string OrganizationName { get; set; } = string.Empty;

        public string ContractNumber { get; set; } = string.Empty;

        public DateTime CreationDate { get; set; }

        public DateTime? StartDateOfWork { get; set; }

        public DateTime? EndDateOfWork { get; set; }

        public DateTime? ExpirationDate { get; set; }
    }
}
