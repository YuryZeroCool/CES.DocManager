using AutoMapper;
using CES.Domain.Models.Request.Mes;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes
{
    public class OrganizationsBySearchHandler : IRequestHandler<OrganizationsBySearchRequest,List<string>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public OrganizationsBySearchHandler(IMapper mapper, DocMangerContext ctx) 
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<string>> Handle(OrganizationsBySearchRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.OrganizationEntities != null)
            {
                if (string.IsNullOrEmpty(request.Title))
                {
                    if (await _ctx.OrganizationEntities.CountAsync(cancellationToken) == 0) return new List<string>();
                    return await Task.FromResult(_mapper.Map<List<string>>(_ctx.OrganizationEntities.Select(p => p.Name)));
                }
                else
                {
                    var res = await _ctx.OrganizationEntities
                        .Where(x => x.Name.ToUpper()
                                    .Trim()
                                    .TrimEnd()
                                    .Contains(request.Title.ToUpper().Trim().TrimEnd()))
                        .ToListAsync(cancellationToken);
                    if (res.Count == 0) return new List<string>();
                    return await Task.FromResult(_mapper.Map<List<string>>(res.Select(p=>p.Name)));
                }
            }
            throw new NotImplementedException();
        }
    }
}
