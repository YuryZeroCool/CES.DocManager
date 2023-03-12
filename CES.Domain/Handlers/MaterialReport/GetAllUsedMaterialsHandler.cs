using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetAllUsedMaterialsHandler : IRequestHandler<GetAllUsedMaterialsRequest, List<GetAllUsedMaterialsResponse>>
    {
        private readonly DocMangerContext _ctx;
        private readonly IMapper _mapper;
        public GetAllUsedMaterialsHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetAllUsedMaterialsResponse>> Handle(GetAllUsedMaterialsRequest request, CancellationToken cancellationToken)
        {
            var data = await _ctx.UsedMaterials
                .FirstOrDefaultAsync(x => x.Period.Month == request.Month &&
                    x.Period.Year == request.Year, cancellationToken);

            if (data == null) return new List<GetAllUsedMaterialsResponse>();

            var materials = JsonSerializer.Deserialize<List<UsedMaterial>>(data.Materials);
            if (materials == null) throw new SystemException("Error");

            return await Task.FromResult(materials.Select(p => _mapper.Map<GetAllUsedMaterialsResponse>(p)).ToList());
        }
    }
}
