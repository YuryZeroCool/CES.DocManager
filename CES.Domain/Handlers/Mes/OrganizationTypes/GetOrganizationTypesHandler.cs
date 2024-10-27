using AutoMapper;
using CES.Domain.Models.Request.Mes.OrganizationTypes;
using CES.Domain.Models.Response.Mes.OrganizationTypes;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.OrganizationTypes
{
    public class GetOrganizationTypesHandler : IRequestHandler<GetOrganizationTypesRequest, List<GetOrganizationTypesResponse>>
    {
        public DocMangerContext _ctx;

        public IMapper _mapper;

        public GetOrganizationTypesHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<List<GetOrganizationTypesResponse>> Handle(GetOrganizationTypesRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.OrganizationTypes != null)
            {
                var res = await _ctx.OrganizationTypes.ToListAsync(cancellationToken);
                if (res != null)
                {
                    return await Task.FromResult(_mapper.Map<List<GetOrganizationTypesResponse>>(res));
                }
            }
            throw new System.Exception("Упс! Что-то пошло не так");
        }
    }
}
