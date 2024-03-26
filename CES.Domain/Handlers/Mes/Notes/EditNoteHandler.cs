using CES.Domain.Models.Request.Mes.Notes;
using CES.Domain.Models.Response.Mes.Notes;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Notes
{
    public class EditNoteHandler : IRequestHandler<EditNoteRequest, EditNoteResponse>
    {
        private readonly DocMangerContext _ctx;

        public EditNoteHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<EditNoteResponse> Handle(EditNoteRequest request, CancellationToken cancellationToken)
        {
            var currentNote = await _ctx.NoteEntities.FirstOrDefaultAsync(x => x.Id == request.EditId, cancellationToken);
            if (currentNote == null) throw new System.Exception("Error");
            request.EditNote!.ApplyTo(currentNote);

            await _ctx.SaveChangesAsync(cancellationToken);

            var data = await _ctx.NoteEntities.FindAsync(currentNote.Id);
            if (data == null) throw new System.Exception("Error");

            return await Task.FromResult(new EditNoteResponse()
            {
                Id = data.Id,
                Comment = data.Comment,
                Date = data.Date,
                IsChecked = data.IsChecked,
            });
        }
    }
}
