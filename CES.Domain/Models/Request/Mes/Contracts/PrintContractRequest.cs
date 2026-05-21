using CES.Domain.Models.Response.Mes.Contracts;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Contracts
{
    public class PrintContractRequest : IRequest<PrintContractResponse>
    {
        public int ContractId { get; set; }
    }
}
