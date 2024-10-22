using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetAllEnshrinedMaterialHandler : IRequestHandler<GetAllEnshrinedMaterialRequest, List<GetAllEnshrinedMaterialResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper; 

        public GetAllEnshrinedMaterialHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<List<GetAllEnshrinedMaterialResponse>> Handle(GetAllEnshrinedMaterialRequest request, CancellationToken cancellationToken)
        {
            var material =  await _ctx.EnshrinedMaterial.Select(p=>
                _mapper.Map<GetAllEnshrinedMaterialResponse>(p)).ToListAsync(cancellationToken);

            if (material == null) throw new System.Exception("Упс! Что-то пошло не так");

            return material;    
        }
    }
}
