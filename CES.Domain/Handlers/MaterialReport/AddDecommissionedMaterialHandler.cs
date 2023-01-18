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
        private NumberPlateOfCarEntity? _numberPlateOfCar;

        private readonly DocMangerContext _ctx;

        private readonly List<AddDecommissionedMaterial> _materials;

        public AddDecommissionedMaterialHandler(DocMangerContext ctx)
        { 
            _ctx = ctx;
            _materials = new List<AddDecommissionedMaterial>();
        }
        public async Task<AddDecommissionedMaterialResponse> Handle(AddDecommissionedMaterialRequest request, CancellationToken cancellationToken)
        {
            if(request.Materials == null || request.Materials.Count == 0) throw new System.Exception("Error");

            foreach (var material in request.Materials)
            {
               var enshrinedMaterial = await _ctx.EnshrinedMaterial.FirstOrDefaultAsync(x =>
                   x.Id == material.Id, cancellationToken);

                if (enshrinedMaterial == null || material.Count == 0) throw new System.Exception("Error");

                var difference = Math.Abs(material.Count * .00001);

                if (Math.Abs(material.Count - enshrinedMaterial.Count) <= difference)
                {
                    _ctx.EnshrinedMaterial.Remove(enshrinedMaterial);
                }
                else
                {
                    enshrinedMaterial.Count -= material.Count;
                    if (enshrinedMaterial.Count < 0) throw new System.Exception("Error");
                    _ctx.Update(enshrinedMaterial);
                }
                _materials.Add(material);
                _numberPlateOfCar = await _ctx.NumberPlateOfCar
                    .FirstOrDefaultAsync(x => x.Number == material.NumberPlateCar,cancellationToken);
                if(_numberPlateOfCar == null) throw new System.Exception("Error");
            }
            var mechanic = await _ctx.CarMechanics.FirstOrDefaultAsync(x =>
                x.FIO == request.CarMechanic, cancellationToken);
            if (mechanic == null) throw new System.Exception("Error");
            var decommissionMaterial = new DecommissionedMaterialEntity()
            {
                CurrentDate = request.CurrentDate,
                CarMechanic = mechanic,
                Materials = JsonSerializer.SerializeToUtf8Bytes(_materials),
                NumberPlateOfCar = _numberPlateOfCar,
            };
            await _ctx.DecommissionedMaterials.AddAsync(decommissionMaterial, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);

            return await Task.FromResult( new AddDecommissionedMaterialResponse()
            {
                Id = decommissionMaterial.Id,
                CarMechanic = decommissionMaterial.CarMechanic.FIO,
                CurrentDate = decommissionMaterial.CurrentDate,
                Materials = JsonSerializer.Deserialize<List<AddDecommissionedMaterial>>(decommissionMaterial.Materials)
            });
        }
    }
}
