using AutoMapper;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Response.Mes;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes
{
    public class OrganizationsBySearchHandler : IRequestHandler<OrganizationsBySearchRequest,List<OrganizationsBySearchResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public OrganizationsBySearchHandler(IMapper mapper, DocMangerContext ctx) 
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<OrganizationsBySearchResponse>> Handle(OrganizationsBySearchRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.OrganizationEntities != null)
            {
                if (string.IsNullOrEmpty(request.Title))
                {
                    if (await _ctx.OrganizationEntities.CountAsync() == 0) return new List<OrganizationsBySearchResponse>();
                    return await Task.FromResult(_mapper.Map<List<OrganizationsBySearchResponse>>(_ctx.OrganizationEntities));
                }
                else
                {
                    var res = await _ctx.OrganizationEntities
                        .Where(x => x.Name.ToUpper().Trim().TrimEnd().Contains(request.Title.ToUpper().Trim().TrimEnd())).ToListAsync();
                    if (res.Count == 0) return new List<OrganizationsBySearchResponse>();
                    return await Task.FromResult(_mapper.Map<List<OrganizationsBySearchResponse>>(res));
                }
            }
            throw new NotImplementedException();
        }
    }
}
