using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetAllEnshrinedMaterialHandler : IRequestHandler<GetAllEnshrinedMaterialRequest, List<GetAllEnshrinedMaterialResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper; 

        public GetAllEnshrinedMaterialHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx    = ctx;
            _mapper = mapper;
        }
        public async Task<List<GetAllEnshrinedMaterialResponse>> Handle(GetAllEnshrinedMaterialRequest request, CancellationToken cancellationToken)
        {
           var material =  await _ctx.EnshrinedMaterial.Select(p=> _mapper.Map<GetAllEnshrinedMaterialResponse>(p)).ToListAsync();
            if (material == null) throw new System.Exception("Error");

            return material;    
        }
    }
}
