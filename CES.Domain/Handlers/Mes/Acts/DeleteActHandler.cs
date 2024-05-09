using CES.Domain.Models.Request.Mes.Acts;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class DeleteActHandler : IRequestHandler<DeleteActRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public DeleteActHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<int> Handle(DeleteActRequest request, CancellationToken cancellationToken)
        {
            if (_ctx is not null && _ctx.Act is not null && _ctx.NoteEntities is not null && request is not null)
            { 
                if(await _ctx.NoteEntities.AnyAsync(x=>x.ActId == request.Id,cancellationToken))
                {
                    var note = await _ctx.NoteEntities.Include(p=>p.Act).Where(x => x.ActId == request.Id).ToListAsync();
                    var act = note![0].Act;
                    note.ForEach(x => x.ActId = null);
                    _ctx.NoteEntities.UpdateRange(note);
                    await _ctx.SaveChangesAsync(cancellationToken);
                    _ctx.Act.Remove(act!);
                    await _ctx.SaveChangesAsync(cancellationToken);
                    return await Task.FromResult(request.Id);
                }
            }
            throw new NotImplementedException();
        }
    }
}
