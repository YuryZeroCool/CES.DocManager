using AutoMapper;
using CES.Domain.Models.Request.Mes.Notes;
using CES.Domain.Models.Response.Mes.Notes;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CES.Domain.Handlers.Mes.Notes
{
    public class CreateExistedNoteHandler : IRequestHandler<CreateExistedNoteRequest, List<NoteResponse>>
    {
        private readonly DocMangerContext _ctx;
        private readonly IMapper _mapper;

        public CreateExistedNoteHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<List<NoteResponse>> Handle(CreateExistedNoteRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.NoteEntities is not null
                && _ctx.Entrances is not null
                && request is not null
                && request.NoteContactsInfo is not null
                && request.NoteContactsInfo.Length > 0
                && _ctx.Streets is not null
                && _ctx.HouseNumbers is not null)
            {
                var createdNoteEntities = new List<NoteEntity>();

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
                                Number = note.HouseNumber!.Trim()
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

                        if (!await _ctx.NoteEntities.AnyAsync(x =>
                               x.Date == request.Date
                            && x.Street!.Name == note.Street!.Trim()
                            && x.HouseNumber!.Number == note.HouseNumber!.Trim(), cancellationToken))
                        {
                            var noteEntity = new NoteEntity()
                            {
                                Comment = request.Comment,
                                Date = request.Date,
                                IsChecked = request.IsChecked,
                                Street = await _ctx.Streets
                                     .FirstOrDefaultAsync(x => x.Name ==
                                        note.Street!.Trim(), cancellationToken),
                                HouseNumber = await _ctx.HouseNumbers
                                     .FirstOrDefaultAsync(x => x.Number ==
                                         note.HouseNumber!.Trim(), cancellationToken),
                                Entrance = note.Entrance == null
                                     ? null
                                     : await _ctx.Entrances!.FirstOrDefaultAsync(x =>
                                         x.Number == (int)note.Entrance!, cancellationToken),
                                Tel = note.Tel
                            };

                            var entry = await _ctx.NoteEntities.AddAsync(noteEntity, cancellationToken);
                            createdNoteEntities.Add(entry.Entity);
                        }
                        else throw new System.Exception("Упс! Что-то пошло не так");
                    }
                }
                await _ctx.SaveChangesAsync(cancellationToken);

                var createdNoteIds = createdNoteEntities.Select(n => n.Id).ToList();
                var createdNotes = await _ctx.NoteEntities
                    .Include(n => n.Street)
                    .Include(n => n.HouseNumber)
                    .Include(n => n.Entrance)
                    .Where(n => createdNoteIds.Contains(n.Id))
                    .ToListAsync(cancellationToken);

                return _mapper.Map<List<NoteResponse>>(createdNotes);
            }
            throw new System.Exception("Упс! Что-то пошло не так");
        }
    }
}
