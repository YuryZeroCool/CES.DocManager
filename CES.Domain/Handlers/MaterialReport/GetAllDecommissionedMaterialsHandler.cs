using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetAllDecommissionedMaterialsHandler : IRequestHandler<GetAllDecommissionedMaterialsRequest, List<GetAllDecommissionedMaterialsResponse>>
    {

        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;


        private readonly List<GetAllDecommissionedMaterialsResponse> _materialsResponses;

        public GetAllDecommissionedMaterialsHandler(DocMangerContext ctx,IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
            _materialsResponses = new List<GetAllDecommissionedMaterialsResponse>(); 
        }
        public async Task<List<GetAllDecommissionedMaterialsResponse>> Handle(GetAllDecommissionedMaterialsRequest request, CancellationToken cancellationToken)
        {
            var materials = await _ctx.DecommissionedMaterials.Include(x=>x.CarMechanic).Include(x=>x.NumberPlateOfCar).ToListAsync(cancellationToken);

            if (materials == null) throw new SystemException("Error");

            foreach (var item in materials)
            {
                var decomissioneMaterials = JsonSerializer.Deserialize<List<AddDecomissioneMaterial>>(item.Materials);

                if (decomissioneMaterials == null) throw new System.Exception("Error");

                if (item.CarMechanic == null) throw new System.Exception("Error");

                _materialsResponses.Add(new GetAllDecommissionedMaterialsResponse()
                {
                    Id = item.Id,
                    CarMechanic = item.CarMechanic.FIO,
                    CurrentDate = item.CurrentDate,
                    Materials = decomissioneMaterials
                });
                             
            }
            return await Task.FromResult(_materialsResponses);

        }
    }
}
