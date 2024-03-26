using AutoMapper;
using CES.Domain.Models.Request.Mes.Notes;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;

namespace CES.Domain.Handlers.Mes.Notes
{
    public class CreateNoteHandler : IRequestHandler<CreateNoteRequest>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;
        public CreateNoteHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;

            _mapper = mapper;
        }
        public async Task<Unit> Handle(CreateNoteRequest request, CancellationToken cancellationToken)
        {
            var note = _mapper.Map<NoteEntity>(request);
            note.Id = 0;
            await _ctx.NoteEntities!.AddAsync(note, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);

            return await Task.FromResult(new Unit());
        }
    }
}
