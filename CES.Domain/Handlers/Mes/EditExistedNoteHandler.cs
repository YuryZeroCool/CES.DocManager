
using CES.Domain.Models.Request.Mes;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using NPOI.SS.Formula.Functions;

namespace CES.Domain.Handlers.Mes
{
    public class EditExistedNoteHandler : IRequestHandler<EditExistedNoteRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public EditExistedNoteHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<int> Handle(EditExistedNoteRequest request, CancellationToken cancellationToken)
        {
            if (!_ctx.NoteEntities.Any(p => p.Id == request.Id)) throw new System.Exception("Error");

            if (request is not null
                 && request.NoteContactsInfo is not null
                 && request.NoteContactsInfo[0] is not null
                 && request.NoteContactsInfo[0].Address is not null)
            {

                EntityEntry? note = null;
                for (int i = 0; i < request.NoteContactsInfo.Length; i++)
                {
                    if (i == 0)
                    {
                        note = _ctx.NoteEntities.Update(new NoteEntity()
                        {
                            Id = request.Id,
                            Comment = request.Comment,
                            Date = request.Date,
                            IsChecked = request.IsChecked,
                            Tel = request.NoteContactsInfo[0].Tel,
                            Address = request.NoteContactsInfo[0].Address,
                        });
                        continue;
                    }
                    note= _ctx.NoteEntities.Add(new NoteEntity()
                    {
                        Comment = request.Comment,
                        Date = request.Date,
                        IsChecked = request.IsChecked,
                        Tel = request.NoteContactsInfo[i].Tel,
                        Address = request.NoteContactsInfo[i].Address
                    });   
                }
                await _ctx.SaveChangesAsync(cancellationToken);
                if (note == null) throw new System.Exception("Error");
                return await Task.FromResult(request.Id);
            }
            throw new System.Exception("Error");
        }
    }
}
