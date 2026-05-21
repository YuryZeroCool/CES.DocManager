using MediatR;

namespace CES.Domain.Models.Request.Mes.Contracts
{
    public class MarkContractPrintedRequest : IRequest<MediatR.Unit>
    {
        public int ContractId { get; set; }
    }
}
