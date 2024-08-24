using AutoMapper;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.Json;

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
            if (_ctx is not null
                && _ctx.Act is not null
                && request is not null
                )
            {
                if (request.Page <= 0) throw new System.Exception("Error");
                var offset = (request.Page - 1) * request.Limit;

                IQueryable<ActEntity> query = _ctx.Act
                    .Include(x => x.Organization)
                    .ThenInclude(x => x.OrganizationType)
                    .Include(x => x.NumberPlateOfCar)
                    .Include(x => x.ActType)
                    .Include(x => x.Employee);

                // Применение фильтра по типу организации после Include
                if (!string.IsNullOrEmpty(request.OrganizationType))
                {
                    query = query.Where(x => x.Organization.OrganizationType.Name== request.OrganizationType);
                }
                // Apply filtering
                query = request.Filter switch
                {
                    "organization" => query.Where(x => x.Organization!.Name.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())),
                    "employee" => query.Where(x => (x.Employee!.LastName + x.Employee.FirstName).ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())),
                    "numberPlateOfCar" => query.Where(x => x.NumberPlateOfCar!.Number!.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())),
                    "street" => query.Include(x => x.Notes!).ThenInclude(p => p.Street)
                                     .Where(x => x.Notes!.Any(n => n.Street!.Name.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim()))),
                    _ => query
                };

                // Apply date range filtering
                query = query.Where(x => x.DateOfWorkCompletion >= request.Min && x.DateOfWorkCompletion <= request.Max);

                // Get the total count of filtered items
                int totalCount = await query.CountAsync(cancellationToken);

                // Apply pagination
                var acts = await query.Skip(offset).Take(request.Limit).ToListAsync(cancellationToken);

                // If no results and page is out of range, throw exception
                if (totalCount == 0 || (totalCount > 0 && acts.Count == 0)) throw new System.Exception("Нет актов");

                int totalPage = (int)Math.Ceiling(totalCount / (double)request.Limit);
                if (totalPage < request.Page) throw new System.Exception("Нет актов");

                var data = new GetActsResponse
                {
                    TotalActsListPagesCount = totalPage,
                    ActsList = new List<Act>()
                };

                // Map the acts and fetch notes
                foreach (var act in acts)
                {
                    var actModel = _mapper.Map<Act>(act);
                    actModel.Works = JsonSerializer.Deserialize<List<Work>>(act.WorkPerformAct!);

                    var notes = await _ctx.NoteEntities!
                        .Include(p => p.Street)
                        .Include(p => p.HouseNumber)
                        .Include(p => p.Entrance)
                        .Where(x => x.ActId == act.Id).ToListAsync(cancellationToken);

                    if (notes is not null) actModel.NotesWithoutAct = _mapper.Map<List<FullNoteData>>(notes);
                    data.ActsList.Add(actModel);
                }

                // Sort the final list
                var sortedData = data.ActsList.OrderBy(p => p.DateOfWorkCompletion).ThenBy(p => p.Organization).ToList();
                data.ActsList = sortedData;

                return await Task.FromResult(data);
            }
            throw new NotImplementedException();
        }

        //public async Task<GetActsResponse> Handle(GetActsRequest request, CancellationToken cancellationToken)
        //{
        //    if (_ctx is not null
        //        && _ctx.Act is not null
        //        && request is not null
        //        )
        //    {
        //        if (request.Page <= 0) throw new System.Exception("Error");
        //        int totalCount = 0;
        //        var offset = (request.Page - 1) * request.Limit;
        //        List<ActEntity>? acts = null;
        //        acts = request.Filter switch
        //        {
        //            "organization" => _ctx.Act
        //                              .Include(x => x.Organization)
        //                              .Include(x => x.NumberPlateOfCar)
        //                              .Include(x => x.ActType)
        //                              .Include(x => x.Employee)
        //                              .AsEnumerable()
        //                              .Where(x => (x.DateOfWorkCompletion >= request.Min) && (x.DateOfWorkCompletion <= request.Max)
        //                                       && (x.Organization!.Name.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())))
        //                              .Skip(offset)
        //                              .Take(request.Limit)
        //                              .ToList(),
        //            "employee" => _ctx.Act
        //                              .Include(x => x.Organization)
        //                              .Include(x => x.NumberPlateOfCar)
        //                              .Include(x => x.ActType)
        //                              .Include(x => x.Employee)
        //                              .AsEnumerable()
        //                              .Where(x => (x.DateOfWorkCompletion >= request.Min) && (x.DateOfWorkCompletion <= request.Max)
        //                                       && ((x.Employee!.LastName + x.Employee.FirstName).ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())))
        //                              .Skip(offset)
        //                              .Take(request.Limit)
        //                              .ToList(),
        //            "numberPlateOfCar" => _ctx.Act
        //                              .Include(x => x.Organization)
        //                              .Include(x => x.NumberPlateOfCar)
        //                              .Include(x => x.ActType)
        //                              .Include(x => x.Employee)
        //                              .AsEnumerable()
        //                              .Where(x => (x.DateOfWorkCompletion >= request.Min) && (x.DateOfWorkCompletion <= request.Max)
        //                                       && (x.NumberPlateOfCar!.Number!.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())))
        //                              .Skip(offset)
        //                              .Take(request.Limit)
        //                              .ToList(),
        //            "street" => _ctx.Act
        //                               .Include(x => x.Organization)
        //                               .Include(x => x.NumberPlateOfCar)
        //                               .Include(x => x.ActType)
        //                               .Include(x => x.Notes!)
        //                               .ThenInclude(p=>p.Street)
        //                               .Include(x => x.Employee)
        //                               .AsEnumerable()
        //                               .Where(x => (x.DateOfWorkCompletion >= request.Min) && (x.DateOfWorkCompletion <= request.Max)
        //                                         && (x.Notes!.FirstOrDefault(x => x.Street!.Name
        //                                            .ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())) != null))
        //                               .Skip(offset)
        //                               .Take(request.Limit)
        //                               .ToList(),
        //            _ => _ctx.Act
        //                              .Include(x => x.Organization)
        //                              .Include(x => x.NumberPlateOfCar)
        //                              .Include(x => x.ActType)
        //                              .Include(x => x.Employee)
        //                              .AsEnumerable()
        //                              .Where(x => (x.DateOfWorkCompletion >= request.Min) && (x.DateOfWorkCompletion <= request.Max))
        //                              .Skip(offset)
        //                              .Take(request.Limit)
        //                              .ToList(),
        //        };

        //        totalCount = acts.Count;
        //        if (totalCount == 0) return await Task.FromResult(new GetActsResponse());
        //        int totalPage = (int)Math.Ceiling(totalCount / (double)request.Limit);
        //        if (totalPage < request.Page) throw new System.Exception("Нет актов");
        //        var data = new GetActsResponse();
        //        data.TotalActsListPagesCount = totalPage;

        //        data.ActsList = new List<Act>();
        //        for (var i = 0; i < acts.Count; i++)
        //        {
        //            data.ActsList.Add(_mapper.Map<Act>(acts[i]));
        //            data.ActsList[i].Works = JsonSerializer.Deserialize<List<Work>>(acts[i].WorkPerformAct!);
        //            var notes = await _ctx.NoteEntities!
        //                .Include(p => p.Street)
        //                .Include(p => p.HouseNumber)
        //                .Include(p => p.Entrance)
        //                .Where(x => x.ActId == acts[i].Id).ToListAsync(cancellationToken);
        //            if (notes is not null) data.ActsList[i].NotesWithoutAct = _mapper.Map<List<FullNoteData>>(notes);
        //        }
        //        var sortedData = data.ActsList.OrderBy(p => p.DateOfWorkCompletion).ThenBy(p => p.Organization);
        //        data.ActsList = sortedData.ToList();
        //        return await Task.FromResult(data);
        //    }
        //    throw new NotImplementedException();
        //}
    }
}
