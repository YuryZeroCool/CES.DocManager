using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class DeleteDecommissionedMaterialHandler : IRequestHandler<DeleteDecommissionedMaterialRequest, int>
    {

        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        private int _id;
        public DeleteDecommissionedMaterialHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<int> Handle(DeleteDecommissionedMaterialRequest request, CancellationToken cancellationToken)
        {
            var material = await _ctx.DecommissionedMaterials
                .Include(p => p.NumberPlateOfCar)
                .Include(p => p.CarMechanic)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (material == null) throw new System.Exception("Упс! Что-то пошло не так");
            var materials = JsonSerializer.Deserialize<List<AddDecommissionedMaterial>>(material.Materials);

            if (materials == null) throw new System.Exception("Упс! Что-то пошло не так");


            foreach (var mater in materials)
            {
                var enshrinedMaterial = await _ctx.EnshrinedMaterial.FirstOrDefaultAsync(x =>
                    x.NameMaterial == mater.NameMaterial
                    && x.NameParty == mater.NameParty
                    && x.NumberPlateCar == mater.NumberPlateCar, cancellationToken);

                if (enshrinedMaterial != null)
                {
                    enshrinedMaterial.Count += mater.Count;
                    _ctx.EnshrinedMaterial.Update(enshrinedMaterial);
                }
                else
                {
                    var res = _mapper.Map<EnshrinedMaterialEntity>(mater);
                    res.Id = 0;
                    await _ctx.EnshrinedMaterial.AddAsync(res, cancellationToken);
                }
            }
            _ctx.DecommissionedMaterials.Remove(material);
            await _ctx.SaveChangesAsync(cancellationToken);
            _id = material.Id;

            return await Task.FromResult(_id);
        }
    }
}
