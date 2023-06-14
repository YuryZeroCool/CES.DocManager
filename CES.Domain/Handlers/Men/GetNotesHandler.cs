using AutoMapper;
using CES.Domain.Models.Request.Men;
using CES.Domain.Models.Response.Men;
using CES.Infra;
using CES.Infra.Models.Men;
using MediatR;
using System.Text.RegularExpressions;

namespace CES.Domain.Handlers.Men
{
    public class GetNotesHandler : IRequestHandler<GetNotesRequest, List<GetNotesResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;
        public GetNotesHandler(DocMangerContext ctx, IMapper mapper) 
        {
            _ctx = ctx;
            _mapper = mapper;  
        }
        public async Task<List<GetNotesResponse>> Handle(GetNotesRequest request, CancellationToken cancellationToken)
        {
            List<NoteEntity> res;
            var comparer = new MyComparer();
            if (request.Text == null)
            {
                res = _ctx.NoteEntities
               .AsEnumerable()
               .Where(x => 
                 x.Date.Year >= request.Min.Year 
               & x.Date.Month >= request.Min.Month
               & x.Date.Year <= request.Max.Year
               & x.Date.Month <= request.Max.Month)
               .OrderBy(p => p, comparer)
               .ToList();
            }
            else
            {
             
                Regex regex = new Regex(@$"{request.Text.ToLower()}(\w*)");
                 res = _ctx.NoteEntities
               .AsEnumerable()
               .Where(x => regex.IsMatch(x.Description.ToLower())
               & (x.Date.Year >= request.Min.Year
               & x.Date.Month >= request.Min.Month
               & x.Date.Year <= request.Max.Year
               & x.Date.Month <= request.Max.Month))
               .OrderBy(x => x, comparer)
               .ToList();
            }

            if (res.Count == 0) return await Task.FromResult(new List<GetNotesResponse>());

            return await Task.FromResult(_mapper.Map<List<GetNotesResponse>>(res));
        }
    }

    public class MyComparer : IComparer<Object>
    {
        public int Compare(object dateA, object dateB) => DateTime.Compare(((NoteEntity)dateA).Date, ((NoteEntity)dateB).Date);

    }
}
