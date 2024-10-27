using CES.Domain.Models.Request.Mes.Notes;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Notes
{
    public class DeleteNotesWithoutActHandler : IRequestHandler<DeleteNotesWithoutActRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public DeleteNotesWithoutActHandler(DocMangerContext ctx) 
        {
            _ctx = ctx;        
        }

        public async Task<int> Handle(DeleteNotesWithoutActRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.NoteEntities is not null)
            {
                var note = await _ctx.NoteEntities.FirstOrDefaultAsync(x => x.Id == request.Id && x.Act == null, cancellationToken)
                    ?? throw new System.Exception("Упс! Что-то пошло не так");
                _ctx.NoteEntities.Remove(note);
                await _ctx.SaveChangesAsync(cancellationToken);
                return await Task.FromResult(note.Id);
            }
            throw new System.Exception("Упс! Что-то пошло не так");
        }
    }
}
