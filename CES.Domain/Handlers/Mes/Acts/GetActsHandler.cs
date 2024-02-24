using AutoMapper;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class GetActsHandler : IRequestHandler<GetActsRequest, GetActsResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;
        public GetActsHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<GetActsResponse> Handle(GetActsRequest request, CancellationToken cancellationToken)
        {

            //if (_ctx is not null
            //    && _ctx.Act is not null
            //    && request is not null
            //    )
            //{
            //    if (request.Page <= 0) throw new System.Exception("Error");
            //    int totalCount = 0;
            //    var offset = (request.Page - 1) * request.Limit;

            //    totalCount = await _ctx.Act
            //      .Where(x =>
            //        x.DateOfWorkCompletion.Year >= request.Min.Year
            //      & x.DateOfWorkCompletion.Month >= request.Min.Month
            //      & x.DateOfWorkCompletion.Year <= request.Max.Year
            //      & x.DateOfWorkCompletion.Month <= request.Max.Month)
            //      .CountAsync(cancellationToken);

            //    if (totalCount == 0) return await Task.FromResult(new GetActsResponse());

            //    int totalPage = (int)Math.Ceiling(totalCount / (double)request.Limit);

            //    if (totalPage < request.Page) throw new System.Exception("Нет актов");

            //    var data = new GetActsResponse();

            //    data.TotalActsListPagesCount = totalPage;

            //    var acts = _ctx.Act.Include(x => x.Organization)
            //      .Include(x => x.NumberPlateOfCar)
            //      .Include(x => x.ActType)
            //      .Include(x => x.Employee)
            //      .Include(x => x.WorkPerformAct)
            //      // .ThenInclude(x => x.Price)
            //      .Include(x => x.WorkPerformAct)
            //      .ThenInclude(x => x.Name.Unit)
            //      .Include(x => x.WorkPerformAct)
            //      .ThenInclude(x => x.Name)
            //      .AsEnumerable()
            //      .Where(x =>
            //                 x.DateOfWorkCompletion.Year >= request.Min.Year
            //               & x.DateOfWorkCompletion.Month >= request.Min.Month
            //               & x.DateOfWorkCompletion.Year <= request.Max.Year
            //               & x.DateOfWorkCompletion.Month <= request.Max.Month)
            //      .Skip(offset)
            //      .Take(request.Limit)
            //      .ToList();
            //    data.ActsList = new List<Act>();

            //    for (var i = 0; i < acts.Count; i++)
            //    {
            //        data.ActsList.Add(_mapper.Map<Act>(acts[i]));

            //        data.ActsList[i].Works = _mapper.Map<List<Work>>(acts[i].WorkPerformAct);

            //        if (data.ActsList[i].Works is not null)
            //        {
            //            foreach (var item in data.ActsList[i].Works!)
            //            {
            //                if (decimal.TryParse(item.Count.Replace(".", ","), out var value))
            //                {
            //                    item.TotalSumm = Math.Round(value * item.Price, 2);
            //                }
            //                else
            //                {
            //                    throw new System.Exception("Error");
            //                }
            //            }
            //        }
            //        var notes = await _ctx.NoteEntities!
            //            .Include(p => p.Street)
            //            .Include(p => p.HouseNumber)
            //            .Include(p => p.Entrance)
            //            .Where(x => x.ActId == acts[i].Id).ToListAsync(cancellationToken);

            //        if (notes is not null)
            //        {
            //            data.ActsList[i].NotesWithoutAct = _mapper.Map<List<FullNoteData>>(notes);
            //        }
            //    }

            //    return await Task.FromResult(data);
            //}
            throw new NotImplementedException();
        }
    }
}
