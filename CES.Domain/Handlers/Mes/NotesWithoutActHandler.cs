using AutoMapper;
using CES.Domain.Handlers.Comparers;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Response.Mes;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes
{
    public class NoteWithoutActHandler : IRequestHandler<NotesWithoutActRequest, IEnumerable<NotesWithoutActResponse>>
    {
        private readonly IMapper _mapper;

        private readonly DocMangerContext _ctx;

        public NoteWithoutActHandler (IMapper mapper, DocMangerContext ctx)
        {
           _mapper = mapper;
            _ctx = ctx;
        }

        public async Task<IEnumerable<NotesWithoutActResponse>> Handle(NotesWithoutActRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.NoteEntities == null)
            {
                throw new System.Exception("Контекст заякок не инициализирован.");
            }
            var comparer = new DateComparer();
            var notes =  
                _ctx.NoteEntities
                .AsEnumerable()
                .Where(x => x.ActId == null)
                .OrderByDescending(p => p, comparer)
               .ToList(); ;

           if (notes.Count == 0) return  await Task.FromResult(new List<NotesWithoutActResponse>());
            return await Task.FromResult(_mapper.Map<List<NotesWithoutActResponse>>( notes));
        }
    }
}
