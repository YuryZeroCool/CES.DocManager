using AutoMapper;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Response.Mes;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Mes
{
    public class GetOrganizationsHandler : IRequestHandler<GetOrganizationsRequest, List<GetOrganizationsResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;  

        public GetOrganizationsHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetOrganizationsResponse>> Handle(GetOrganizationsRequest request, CancellationToken cancellationToken)
        {
            var organizations = _ctx.OrganizationEntities;
            if (organizations == null)  return  await Task.FromResult ( new List<GetOrganizationsResponse>());
            return await Task.FromResult(_mapper.Map<List<GetOrganizationsResponse>>(organizations));
        }
    }
}
