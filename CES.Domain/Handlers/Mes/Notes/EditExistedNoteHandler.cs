using CES.Domain.Models.Request.Mes.Notes;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace CES.Domain.Handlers.Mes.Notes
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
            if (_ctx.NoteEntities is not null
                && request is not null
                && request.NoteContactsInfo is not null
                && request.NoteContactsInfo.Length > 0
                && _ctx.Streets is not null
                && _ctx.HouseNumbers is not null
                && _ctx.Entrances is not null)
            {
                if (!_ctx.NoteEntities.Any(p => p.Id == request.Id)) throw new System.Exception("Error");

                EntityEntry? note = null;

                for (int i = 0; i < request.NoteContactsInfo.Length; i++)
                {
                    if (request.NoteContactsInfo[i] is not null
                        && !string.IsNullOrEmpty(request.NoteContactsInfo[i].Street)
                        && !string.IsNullOrEmpty(request.NoteContactsInfo[i].HouseNumber))
                    {
                        if (!_ctx.Streets.Any(x => x.Name == request.NoteContactsInfo[i].Street!.Trim()))
                        {
                            await _ctx.Streets.AddAsync(new StreetEntity()
                            {
                                Name = request.NoteContactsInfo[i].Street!.Trim(),
                            }, cancellationToken);
                            await _ctx.SaveChangesAsync(cancellationToken);
                        }
                        if (!_ctx.HouseNumbers.Any(p => p.Number == request.NoteContactsInfo[i].HouseNumber!.Trim()))
                        {
                            await _ctx.HouseNumbers.AddAsync(new HouseNumberEntity()
                            {
                                Number = request.NoteContactsInfo[i].HouseNumber!.Trim()
                            }, cancellationToken);
                            await _ctx.SaveChangesAsync(cancellationToken);
                        }
                        if (request.NoteContactsInfo[i].Entrance is not null
                            && !_ctx.Entrances.Any(p => p.Number == request.NoteContactsInfo[i].Entrance))
                        {
                            await _ctx.Entrances.AddAsync(new EntranceEntity()
                            {
                                Number = (int)request.NoteContactsInfo[i].Entrance!
                            }, cancellationToken);
                            await _ctx.SaveChangesAsync(cancellationToken);
                        }

                        var date = new NoteEntity()
                        {
                            Comment = request.Comment,
                            Date = request.Date,
                            IsChecked = request.IsChecked,
                            Street = await _ctx.Streets
                                 .FirstOrDefaultAsync(x => x.Name ==
                                     request.NoteContactsInfo[i].Street!.Trim(), cancellationToken),
                            HouseNumber = await _ctx.HouseNumbers
                                 .FirstOrDefaultAsync(x => x.Number ==
                                     request.NoteContactsInfo[i].HouseNumber!.Trim(), cancellationToken),
                            Entrance = request.NoteContactsInfo[i].Entrance == null
                                 ? null
                                 : await _ctx.Entrances.FirstOrDefaultAsync(x =>
                                     x.Number == (int)request.NoteContactsInfo[i].Entrance!, cancellationToken),
                            Tel = request.NoteContactsInfo[i].Tel,
                        };

                        if (i == 0)
                        {
                            date.Id = request.Id;
                            note = _ctx.NoteEntities.Update(date);
                            continue;
                        }
                        await _ctx.NoteEntities.AddAsync(date, cancellationToken);
                    }
                }
                await _ctx.SaveChangesAsync(cancellationToken);
                return await Task.FromResult(request.Id);
            }
            throw new System.Exception("Error");
        }
    }
}
