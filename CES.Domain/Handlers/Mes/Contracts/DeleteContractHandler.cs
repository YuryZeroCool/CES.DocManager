using CES.Domain.Models.Request.Mes.Contracts;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Contracts
{
    public class DeleteContractHandler : IRequestHandler<DeleteContractRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public DeleteContractHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<int> Handle(DeleteContractRequest request, CancellationToken cancellationToken)
        {
            if (_ctx?.Contracts is null || _ctx.Act is null || _ctx.NoteEntities is null)
            {
                throw new NotImplementedException();
            }

            var contract = await _ctx.Contracts
                .Include(c => c.Acts)
                .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken)
                ?? throw new System.Exception("Договор не найден");

            var acts = contract.Acts?.ToList() ?? new List<ActEntity>();

            if (acts.Count > 0)
            {
                var actIds = acts.Select(a => a.Id).ToList();
                var notes = await _ctx.NoteEntities
                    .Where(x => x.ActId != null && actIds.Contains(x.ActId.Value))
                    .ToListAsync(cancellationToken);

                if (notes.Count > 0)
                {
                    notes.ForEach(x => x.ActId = null);
                    _ctx.NoteEntities.UpdateRange(notes);
                    await _ctx.SaveChangesAsync(cancellationToken);
                }

                _ctx.Act.RemoveRange(acts);
                await _ctx.SaveChangesAsync(cancellationToken);
            }

            _ctx.Contracts.Remove(contract);
            await _ctx.SaveChangesAsync(cancellationToken);

            return request.Id;
        }
    }
}
