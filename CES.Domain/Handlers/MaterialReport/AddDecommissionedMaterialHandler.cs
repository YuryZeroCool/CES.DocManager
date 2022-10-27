using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using CES.Infra.Models;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class AddDecommissionedMaterialHandler : IRequestHandler<AddDecommissionedMaterialRequest, AddDecommissionedMaterialResponse>
    {
        private NumberPlateCarEntity? NumberPlateOfCar;

        private readonly DocMangerContext _ctx;

        private readonly List<AddDecomissioneMaterial> Materials;

        public AddDecommissionedMaterialHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
           Materials = new List<AddDecomissioneMaterial>();
        }
        public async Task<AddDecommissionedMaterialResponse> Handle(AddDecommissionedMaterialRequest request, CancellationToken cancellationToken)
        {
            if(request.Materials == null) throw new System.Exception("Error");

            if (request.Materials.Count == 0) throw new System.Exception("Error");

            foreach (var material in request.Materials)
            {
               var enshrinedMaterial = await _ctx.EnshrinedMaterial.FirstOrDefaultAsync(x=>x.Id == material.Id,cancellationToken);

                if (enshrinedMaterial == null) throw new System.Exception("Error");

                if(material.Count == 0) throw new System.Exception("Error");

                if(material.Count == enshrinedMaterial.Count)
                {
                    _ctx.EnshrinedMaterial.Remove(enshrinedMaterial);
                }
                else
                {
                    enshrinedMaterial.Count -= material.Count;
                    if (enshrinedMaterial.Count < 0) throw new System.Exception("Error");
                    _ctx.Update(enshrinedMaterial);
                }
                Materials.Add(material);
                NumberPlateOfCar = await _ctx.NumberPlateOfCar.FirstOrDefaultAsync(x => x.Number == material.NumberPlateCar,cancellationToken);
                if(NumberPlateOfCar == null) throw new System.Exception("Error");
            }
            var mehanic = await _ctx.CarMechanics.FirstOrDefaultAsync(x => x.FIO == request.CarMechanic);
            if (mehanic == null) throw new System.Exception("Error");
            var decommissionMaterial = new DecommissionedMaterialEntity()
            {
                CurrentDate = request.CurrentDate,
                CarMechanic = mehanic,
                Materials = JsonSerializer.SerializeToUtf8Bytes(Materials),
                NumberPlateOfCar = NumberPlateOfCar,
            };
            await _ctx.DecommissionedMaterials.AddAsync(decommissionMaterial, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);

            return await Task.FromResult( new AddDecommissionedMaterialResponse()
            {
                Id = decommissionMaterial.Id,
                CarMechanic = decommissionMaterial.CarMechanic.FIO,
                CurrentDate = decommissionMaterial.CurrentDate,
                Materials = JsonSerializer.Deserialize<List<AddDecomissioneMaterial>>(decommissionMaterial.Materials)
            });
        }
    }
}
