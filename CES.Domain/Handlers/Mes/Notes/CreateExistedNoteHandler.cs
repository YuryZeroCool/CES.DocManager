using CES.Domain.Models.Request.Mes.Notes;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Notes
{
    public class CreateExistedNoteHandler : IRequestHandler<CreateExistedNoteRequest, string>
    {
        private readonly DocMangerContext _ctx;

        public CreateExistedNoteHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<string> Handle(CreateExistedNoteRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.NoteEntities is not null
                && _ctx.Entrances is not null
                && request is not null
                && request.NoteContactsInfo is not null
                && request.NoteContactsInfo.Length > 0
                && _ctx.Streets is not null
                && _ctx.HouseNumbers is not null)
            {
                foreach (var note in request.NoteContactsInfo)
                {
                    if (note is not null
                        && !string.IsNullOrEmpty(note.Street)
                        && !string.IsNullOrEmpty(note.HouseNumber))
                    {
                        if (!_ctx.HouseNumbers.Any(p => p.Number == note.HouseNumber.Trim()))
                        {
                            await _ctx.HouseNumbers.AddAsync(new HouseNumberEntity()
                            {
                                Number = note.HouseNumber.Trim()
                            }, cancellationToken);
                            await _ctx.SaveChangesAsync(cancellationToken);
                        }
                        if (note.Entrance is not null
                            && !_ctx.Entrances.Any(p => p.Number == note.Entrance))
                        {
                            await _ctx.Entrances.AddAsync(new EntranceEntity()
                            {
                                Number = (int)note.Entrance!
                            }, cancellationToken);
                            await _ctx.SaveChangesAsync(cancellationToken);
                        }
                    }
                    if (!await _ctx.NoteEntities.AnyAsync(x =>
                           x.Date == request.Date
                        && x.Street!.Name == note!.Street
                        && x.HouseNumber!.Number == note.HouseNumber,cancellationToken))
                    {
                        await _ctx.NoteEntities.AddAsync(new NoteEntity()
                        {
                            Comment = request.Comment,
                            Date = request.Date,
                            IsChecked = request.IsChecked,
                            Street = await _ctx.Streets
                                 .FirstOrDefaultAsync(x => x.Name ==
                                    note!.Street!.Trim(), cancellationToken),
                            HouseNumber = await _ctx.HouseNumbers
                                 .FirstOrDefaultAsync(x => x.Number ==
                                     note!.HouseNumber!.Trim(), cancellationToken),
                            Entrance = note!.Entrance == null
                                 ? null
                                 : await _ctx.Entrances!.FirstOrDefaultAsync(x =>
                                     x.Number == (int)note.Entrance!, cancellationToken),
                            Tel = note.Tel
                        },cancellationToken);
                   }
                    else throw new System.Exception("Упс! Что-то пошло не так");
                }
                await _ctx.SaveChangesAsync(cancellationToken);
                return await Task.FromResult("ok");
            }
            throw new System.Exception("Упс! Что-то пошло не так");
        }
    }
}
