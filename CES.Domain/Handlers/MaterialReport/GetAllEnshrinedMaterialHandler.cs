using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Domain.Services;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetAllEnshrinedMaterialHandler : IRequestHandler<GetAllEnshrinedMaterialRequest, List<GetAllEnshrinedMaterialResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        private readonly ICurrentUserRole _currentUserRole;

        public GetAllEnshrinedMaterialHandler(DocMangerContext ctx, IMapper mapper, ICurrentUserRole currentUserRole)
        {
            _ctx = ctx;
            _mapper = mapper;
            _currentUserRole = currentUserRole;
        }
        public async Task<List<GetAllEnshrinedMaterialResponse>> Handle(GetAllEnshrinedMaterialRequest request, CancellationToken cancellationToken)
        {
            var visibleRoles = MaterialOwnerRole.VisibleFor(_currentUserRole.GetRole());
            var material = await _ctx.EnshrinedMaterial
                .Where(p => p.OwnerRole != null && visibleRoles.Contains(p.OwnerRole))
                .Select(p => _mapper.Map<GetAllEnshrinedMaterialResponse>(p))
                .ToListAsync(cancellationToken);

            if (material == null) throw new System.Exception("Упс! Что-то пошло не так");

            return material;
        }
    }
}
