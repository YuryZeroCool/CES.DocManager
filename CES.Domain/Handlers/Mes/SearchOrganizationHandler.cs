using AutoMapper;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Response.Mes;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes
{
    public class SearchOrganizationHandler : IRequestHandler<SearchOrganizationRequest, SearchOrganizationResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public SearchOrganizationHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<SearchOrganizationResponse> Handle(SearchOrganizationRequest request, CancellationToken cancellationToken)
        {
            List<OrganizationEntity> result;

            if (request.Page <= 0) throw new System.Exception("Error");
            int totalCount = 0;
            var offset = (request.Page - 1) * request.Limit;
           
            if (string.IsNullOrEmpty(request.Title))
            {
                totalCount = await _ctx.OrganizationEntities.CountAsync();
            }
            else
            {
                totalCount = await _ctx.OrganizationEntities
                    .Where(x => x.Name.Contains(request.Title))
                    .CountAsync();
            }
            int totalPage = (int)Math.Ceiling(totalCount / (double)request.Limit);

            if (totalCount == 0 || totalPage < request.Page) throw new System.Exception("Нет организаций");


            if (string.IsNullOrEmpty(request.Title))
            {
                result = await _ctx.OrganizationEntities
                   .Skip(offset)
                   .Take(request.Limit)
                   .ToListAsync(cancellationToken);
            }
            else
            {
                result = await _ctx.OrganizationEntities
                     .Where(x => x.Name.Contains(request.Title))
                     .Skip(offset)
                     .Take(request.Limit)
                     .ToListAsync(cancellationToken);
            }
            return await Task.FromResult(new SearchOrganizationResponse()
            {
                Organizations = _mapper.Map<List<CreateOrganizationResponse>>(result),
                TotalPage = totalPage
            });
        }
    }
}