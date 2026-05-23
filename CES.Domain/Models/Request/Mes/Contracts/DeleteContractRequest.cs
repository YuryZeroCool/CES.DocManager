using MediatR;

namespace CES.Domain.Models.Request.Mes.Contracts
{
    public class DeleteContractRequest : IRequest<int>
    {
        public int Id { get; set; }
    }
}
