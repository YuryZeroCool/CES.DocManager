using CES.Domain.Models.Request.Mes.Contracts;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Contracts
{
    public class MarkContractPrintedHandler : IRequestHandler<MarkContractPrintedRequest, MediatR.Unit>
    {
        private readonly DocMangerContext _ctx;

        public MarkContractPrintedHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<MediatR.Unit> Handle(MarkContractPrintedRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.Contracts is null)
            {
                throw new System.Exception("Упс! Что-то пошло не так");
            }

            var contract = await _ctx.Contracts
                .FirstOrDefaultAsync(c => c.Id == request.ContractId, cancellationToken)
                ?? throw new System.Exception("Договор не найден");

            contract.IsPrinted = true;
            await _ctx.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
