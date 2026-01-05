using AutoMapper;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
                request.Limit *= request.Limit * 3;
                if (request.Page <= 0) throw new System.Exception("Упс! Что-то пошло не так");
                var offset = (request.Page - 1) * request.Limit;

                IQueryable<ActEntity> query = _ctx.Act
                    .Include(x => x.Contract)
                    .ThenInclude(x => x!.Organization)
                    .ThenInclude(x => x!.OrganizationType)
                    .Include(x => x.NumberPlateOfCar)
                    .Include(x => x.ActType)
                    .Include(x => x.Employee);

                // Применение фильтра по типу организации после Include
                if (!string.IsNullOrEmpty(request.OrganizationType))
                {
                    query = query.Where(x => x.Contract != null &&
                                             x.Contract.Organization != null &&
                                             x.Contract.Organization.OrganizationType != null &&
                                             x.Contract.Organization.OrganizationType.Name == request.OrganizationType.Trim());
                }
                // Apply filtering
                query = request.Filter switch
                {
                    "organization" => query.Where(x => x.Contract != null &&
                                                       x.Contract.Organization != null &&
                                                       x.Contract.Organization.Name.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())),
                    "contractNumber" => query.Where(x => x.Contract != null &&
                                                     x.Contract.ContractNumber.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())),
                    "isNotSigned" => query.Where(x => x.IsSigned == false),

                    "employee" => query.Where(x => x.Employee != null &&
                                                   (x.Employee.LastName + x.Employee.FirstName).ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())),
                    "numberPlateOfCar" => query.Where(x => x.NumberPlateOfCar != null &&
                                                           x.NumberPlateOfCar.Number != null &&
                                                           x.NumberPlateOfCar.Number.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())),
                    "street" => query.Include(x => x.Notes!).ThenInclude(p => p.Street)
                                     .Where(x => x.Notes != null &&
                                                x.Notes.Any(n => n.Street != null &&
                                                                n.Street.Name.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim()))),
                    _ => query
                };

                // Apply date range filtering
                query = query.Where(x => x.DateOfWorkCompletion.Date >= request.Min.Date && x.DateOfWorkCompletion.Date <= request.Max.Date);

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
    }
}