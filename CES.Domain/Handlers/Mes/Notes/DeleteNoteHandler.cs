using AutoMapper;
using CES.Domain.Models.Request.Mes.Notes;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Notes
{
    public class DeleteNoteHandler : IRequestHandler<DeleteNoteRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public DeleteNoteHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<int> Handle(DeleteNoteRequest request, CancellationToken cancellationToken)
        {
            var note = await _ctx.NoteEntities.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (note == null) throw new System.Exception("Error");
            _ctx.NoteEntities.Remove(note);
            await _ctx.SaveChangesAsync(cancellationToken);
            return await Task.FromResult(note.Id);
        }
    }
}
