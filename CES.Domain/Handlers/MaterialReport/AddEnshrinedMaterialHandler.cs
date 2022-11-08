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
            EnshrinedMaterialEntity? enshrine;
            
            var party = await _ctx.Parties.FirstOrDefaultAsync(x => x.Name == request.Party, cancellationToken);

            if (party == null || party.ProductId == 0) throw new System.Exception("Error");

            var product = await _ctx.Products
                .Include(p => p.Unit)
                .Include(p => p.Account)
                .Include(p => p.Parties)
                .FirstOrDefaultAsync(x => x.Id == party.ProductId, cancellationToken);

            if (product == null || product.Parties == null || product.Parties.Count == 0) throw new System.Exception("Error");

            if (_ctx.EnshrinedMaterial.Any(x => x.VehicleBrand == request.Brand &&
               x.NumberPlateCar == request.NumberPlateOfCar && x.NameParty == request.Party)) // если существует такой закрепленный материал
            {
                var enshrinedMaterial = await _ctx.EnshrinedMaterial
                    .FirstOrDefaultAsync(x =>
                    x.VehicleBrand == request.Brand &&
                    x.NumberPlateCar == request.NumberPlateOfCar &&
                    x.NameParty == request.Party, cancellationToken);

                if (enshrinedMaterial == null) throw new System.Exception("Error");
                enshrinedMaterial.Count += request.Count;
                _ctx.EnshrinedMaterial.Update(enshrinedMaterial);

                await _ctx.SaveChangesAsync(cancellationToken);

                enshrine = await _ctx.EnshrinedMaterial.FirstOrDefaultAsync(x => x.VehicleBrand == request.Brand &&
               x.NumberPlateCar == request.NumberPlateOfCar && x.NameParty == request.Party, cancellationToken);
            }
            else
            {
                enshrine = new EnshrinedMaterialEntity();
                enshrine.Count = request.Count;
                enshrine.NameMaterial = product.Name;
                enshrine.NameParty = party.Name;
                enshrine.PartyDate = party.PartyDate;
                enshrine.Price = party.Price;
                enshrine.DateCreated = party.DateCreated;
                enshrine.AccountName = product.Account!.AccountName;
                enshrine.Unit = product.Unit!.Name;

                var car = await _ctx.NumberPlateOfCar
                    .Include(p => p.VehicleModel)
                    .Include(p => p.VehicleModel!.VehicleBrand)
                    .FirstOrDefaultAsync(x => x.Number == request.NumberPlateOfCar, cancellationToken);

                if (car == null) throw new System.Exception("No vehicle brand");

                enshrine.NumberPlateCar = car.Number;
                enshrine.VehicleModel = car.VehicleModel!.Name;

                enshrine.VehicleBrand = car.VehicleModel.VehicleBrand!.Name;

                await _ctx.EnshrinedMaterial.AddAsync(enshrine, cancellationToken);
            }

            if (party.Count > request.Count)
            {
                party.Count -= request.Count;
                _ctx.Parties.Update(party);

                await _ctx.SaveChangesAsync(cancellationToken);
            }
            else
            {
                if(product.Parties.Count == 1)
                {
                    _ctx.Products.Remove(party.Product!);
                }
                _ctx.Parties.Remove(party);

                await _ctx.SaveChangesAsync(cancellationToken);
            }
            return await Task.FromResult(_mapper.Map<AddEnshrinedMaterialResponse>(enshrine));
        }
    }
}
