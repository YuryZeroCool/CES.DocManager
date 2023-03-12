using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetAllDecommissionedMaterialsHandler : IRequestHandler<GetAllDecommissionedMaterialsRequest, List<GetAllDecommissionedMaterialsResponse>>
    {

        private readonly DocMangerContext _ctx;

        private readonly List<GetAllDecommissionedMaterialsResponse> _materialsResponses;

        public GetAllDecommissionedMaterialsHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            _materialsResponses = new List<GetAllDecommissionedMaterialsResponse>(); 
        }
        public async Task<List<GetAllDecommissionedMaterialsResponse>> Handle(GetAllDecommissionedMaterialsRequest request, CancellationToken cancellationToken)
        {
            var limit = 200;
            var page = 0;

             var TotalCount = _ctx.DecommissionedMaterials.Count();
            var chunkLength = (int)Math.Ceiling(TotalCount / (double)limit);

            if (chunkLength < page || page < 0 ) throw new System.Exception("This page does not exist");

            List<DecommissionedMaterialEntity> materials;

            if (chunkLength - page == 0)
            {
                var el = (chunkLength  - 1) * limit;
                 materials = await _ctx.DecommissionedMaterials
                    .Include(x => x.CarMechanic)
                    .Include(x => x.NumberPlateOfCar)
                    .OrderByDescending(x => x.CurrentDate)
                    .Skip(el).Take(TotalCount - el).ToListAsync();
            }
            else
            {
                 materials = await _ctx.DecommissionedMaterials
                    .Include(x => x.CarMechanic)
                    .Include(x => x.NumberPlateOfCar)
                    .OrderByDescending(x => x.CurrentDate)
                    .Skip(page*limit).Take(limit).ToListAsync();
            }

            if (materials == null) throw new SystemException("Error");

            foreach (var item in materials)
            {
                var decommissionedMaterials = JsonSerializer.Deserialize<List<AddDecommissionedMaterial>>(item.Materials);

                if (decommissionedMaterials == null) throw new System.Exception("Error");


                if (item.CarMechanic == null) throw new System.Exception("Error");

                _materialsResponses.Add(new GetAllDecommissionedMaterialsResponse()
                {
                    Id = item.Id,
                    CarMechanic = item.CarMechanic.FIO,
                    CurrentDate = item.CurrentDate,
                    Materials = decommissionedMaterials
                });
                             
            }
            return await Task.FromResult(_materialsResponses);

        }
    }
}
