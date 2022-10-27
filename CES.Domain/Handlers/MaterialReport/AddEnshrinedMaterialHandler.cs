using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class AddEnshrinedMaterialHandler : IRequestHandler<AddEnshrinedMaterialRequest, AddEnshrinedMaterialResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public AddEnshrinedMaterialHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;

            _mapper = mapper;
        }

        public async Task<AddEnshrinedMaterialResponse> Handle(AddEnshrinedMaterialRequest request, CancellationToken cancellationToken)
        {

            var product = await _ctx.Parties.Where(x => x.Name == request.Party).Include(p=>p.Product).ToListAsync(cancellationToken);

            if (product == null) throw new System.Exception("Error");

            if(product.Count == 0 && product.Count > 1) throw new System.Exception("Error");

            var enshrine = new EnshrinedMaterialEntity();

            var IdProduct = 0;
            var IdParty = 0;
            int unit = 0;
            enshrine.Count = request.Count;
            foreach (var item in product)
            {
                IdProduct = item.ProductId;
                IdParty = item.Id;
                unit = item!.Product!.UnitId;
                enshrine.NameMaterial = item.Product.Name;
                enshrine.NameParty = item.Name;
                enshrine.PartyDate = item.PartyDate;
                enshrine.Price = item.Price * (decimal)request.Count;
                enshrine.DateCreated = item.DateCreated;
                enshrine.AccountName =  _ctx.ProductsGroupAccount.
                   FirstOrDefaultAsync(x => x.Id == item.Product.ProductGroupAccountId, cancellationToken).Result!.AccountName;
            }

            if (enshrine.AccountName == null) throw new System.Exception("Error");

            enshrine.Unit = _ctx.Units.FirstOrDefaultAsync(x => x.Id == unit, cancellationToken).Result!.Name;

            var modelsVehicle = await _ctx.NumberPlateOfCar.Where(x => x.Number == request.NumberPlateOfCar)
                  .Include(p => p.VehicleModel).ToListAsync(cancellationToken);

            if (modelsVehicle.Count == 0) throw new System.Exception("No vehicle brand");

            var brandId = 0;
            foreach (var item in modelsVehicle)
            {
                enshrine.NumberPlateCar = item.Number;
                brandId = item.VehicleModel!.VehicleBrandId;
                enshrine.VehicleModel = item.VehicleModel.Name;
            }
            enshrine.VehicleBrand = _ctx.VehicleBrands.FirstOrDefaultAsync(p => p.Id == brandId, cancellationToken).Result!.Name;
              

            var res = await _ctx.Parties.FirstOrDefaultAsync(x => x.Name == request.Party, cancellationToken);

            if (res == null) throw new SystemException("Error");

            if (product[0].Count > request.Count)
            {
                 res.Count -= request.Count;
                _ctx.Parties.Update(res);

               var enshrinedMaterial = await _ctx.EnshrinedMaterial.FirstOrDefaultAsync(x =>
               x.NumberPlateCar == request.NumberPlateOfCar && x.NameParty == request.Party, cancellationToken);
                if (enshrinedMaterial == null)
                {
                    await _ctx.EnshrinedMaterial.AddAsync(enshrine, cancellationToken);
                }
                else
                {
                    enshrinedMaterial.Count += request.Count;   
                    _ctx.EnshrinedMaterial.Update(enshrinedMaterial);
                }


                await _ctx.SaveChangesAsync(cancellationToken);
            }
            else
            {
                if (_ctx.Parties.Where(x => x.ProductId == IdProduct).Count() == 1)
                {
                    _ctx.Products.Remove(res.Product!);
                    _ctx.Parties.Remove(res);
                }
                else _ctx.Parties.Remove(res);

                await _ctx.EnshrinedMaterial.AddAsync(enshrine, cancellationToken);
                 await _ctx.SaveChangesAsync(cancellationToken);
            }
            return  await Task.FromResult(_mapper.Map<AddEnshrinedMaterialResponse>(enshrine));
        }
    }
}
