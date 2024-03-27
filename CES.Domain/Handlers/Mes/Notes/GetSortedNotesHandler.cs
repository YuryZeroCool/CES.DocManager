using AutoMapper;
using CES.Domain.Handlers.Comparers;
using CES.Domain.Models.Request.Mes.Notes;
using CES.Domain.Models.Response.Mes.Notes;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using System.Text.RegularExpressions;

namespace CES.Domain.Handlers.Mes.Notes
{
    public class GetSortedNotesHandler : IRequestHandler<GetSortedNotesRequest, List<GetSortedNotesResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;
        public GetSortedNotesHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<List<GetSortedNotesResponse>> Handle(GetSortedNotesRequest request, CancellationToken cancellationToken)
        {
            List<NoteEntity> res;
            var comparer = new DateComparer();
            if (request.Text == null)
            {
                res = _ctx.NoteEntities
               .AsEnumerable()
               .Where(x =>
                 x.Date.Year >= request.Min.Year
               & x.Date.Month >= request.Min.Month
               & x.Date.Year <= request.Max.Year
               & x.Date.Month <= request.Max.Month)
               .OrderByDescending(p => p, comparer)
               .ToList();
            }
            else
            {

                Regex regex = new Regex(@$"{request.Text.ToLower()}(\w*)");
                res = _ctx.NoteEntities
              .AsEnumerable()
              .Where(x => regex.IsMatch(x.Comment!.ToLower())
              & x.Date.Year >= request.Min.Year
              & x.Date.Month >= request.Min.Month
              & x.Date.Year <= request.Max.Year
              & x.Date.Month <= request.Max.Month)
              .OrderByDescending(x => x, comparer)
              .ToList();
            }

            if (res.Count == 0) return await Task.FromResult(new List<GetSortedNotesResponse>());

            return await Task.FromResult(_mapper.Map<List<GetSortedNotesResponse>>(res));
        }
    }
}
