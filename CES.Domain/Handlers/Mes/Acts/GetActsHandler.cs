using AutoMapper;
using CES.Domain.Handlers.Comparers;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class GetActsHandler : IRequestHandler<GetActsRequest, List<GetActsResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;
        public GetActsHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetActsResponse>> Handle(GetActsRequest request, CancellationToken cancellationToken)
        {

            if(_ctx is not null
                && _ctx.Act is not null
                && request is not null
                ) 
            {
                var comparer = new DateComparer();
                var acts = _ctx.Act.Include(x=>x.Organization)
                  .Include(x => x.NumberPlateOfCar)
                  .Include(x => x.ActType)
                  .Include(x => x.WorkPerformAct)
                  .ThenInclude(x => x.Price)
                  .Include(x=>x.WorkPerformAct)
                  .ThenInclude(x=>x.Name.Unit)
                  .Include(x => x.WorkPerformAct)
                  .ThenInclude(x => x.Name)
                  .AsEnumerable()
                  .Where(x =>
                    x.DateOfWorkCompletion.Year >= request.Min.Year
                  & x.DateOfWorkCompletion.Month >= request.Min.Month
                  & x.DateOfWorkCompletion.Year <= request.Max.Year
                  & x.DateOfWorkCompletion.Month <= request.Max.Month)
                  .OrderByDescending(p => p, comparer)
                  .ToList();
                if (acts.Count == 0)  return await Task.FromResult(new List<GetActsResponse>());
                var data = _mapper.Map<List<GetActsResponse>>(acts);

              for (var i = 0; i < acts.Count; i++)
                {
                  data[i].Works = _mapper.Map<List<Work>>(acts[i].WorkPerformAct);
                    if (data[i].Works is not null)
                    {
                        foreach (var item in data[i].Works!)
                        {
                            if (decimal.TryParse(item.Count.Replace(".",","), out var value))
                            {
                                item.TotalSumm = Math.Round(value * item.Price, 2);
                            }
                            else
                            {
                                throw new System.Exception("Error");
                            }
                        }
                    }
                    var notes = await _ctx.NoteEntities!
                        .Include(p => p.Street)
                        .Include(p => p.HouseNumber)
                        .Include(p => p.Entrance)
                        .Where(x => x.ActId == acts[i].Id).ToListAsync(cancellationToken);

                    if(notes is not null)
                    {
                        data[i].NotesWithoutAct = _mapper.Map<List<FullNoteData>>(notes);
                    }
                }
                return await Task.FromResult(data);
            }
            throw new NotImplementedException();
        }
    }
}
