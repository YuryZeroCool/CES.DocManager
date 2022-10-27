using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class DeleteDecommissionedMaterialHandler : IRequestHandler<DeleteDecommissionedMaterialRequest,int>
    {

        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        private int Id;
        public DeleteDecommissionedMaterialHandler(DocMangerContext ctx,IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<int> Handle(DeleteDecommissionedMaterialRequest request, CancellationToken cancellationToken)
        {
            var material = await _ctx.DecommissionedMaterials.Where(x => x.Id == request.Id)
                .Include(p => p.NumberPlateOfCar)
                .Include(p => p.CarMechanic).ToListAsync();


            if (material == null) throw new System.Exception("Error");

            foreach (var item in material)
            {
                if (item == null) throw new System.Exception("Error");
               var materials =  JsonSerializer.Deserialize<List<AddDecomissioneMaterial>>(item.Materials);

                if (materials == null) throw new System.Exception("Error");


                foreach (var mater in materials)
                {
                    var EnshrinedMaterial = await _ctx.EnshrinedMaterial.FirstOrDefaultAsync(x => x.NameMaterial == mater.NameMaterial
                    && x.NameParty == mater.NameParty
                    && x.NumberPlateCar == mater.NumberPlateCar);

                    if(EnshrinedMaterial != null)
                    {
                        EnshrinedMaterial.Count += mater.Count;
                        _ctx.EnshrinedMaterial.Update(EnshrinedMaterial);
                    }
                    else
                    {
                        var res = _mapper.Map<EnshrinedMaterialEntity>(mater);
                        res.Id = 0;
                       await  _ctx.EnshrinedMaterial.AddAsync(res);
                    }
                }
                _ctx.DecommissionedMaterials.Remove(item);
                await _ctx.SaveChangesAsync(cancellationToken);
                Id = item.Id;
            }

            return await Task.FromResult(Id);
        }
    }
}
