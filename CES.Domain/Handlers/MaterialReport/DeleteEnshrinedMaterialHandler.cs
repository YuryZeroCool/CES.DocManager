﻿using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class DeleteEnshrinedMaterialHandler : IRequestHandler<DeleteEnshrinedMaterialRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public DeleteEnshrinedMaterialHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<int> Handle(DeleteEnshrinedMaterialRequest request, CancellationToken cancellationToken)
        {
            var enshrinedMaterial =  await _ctx.EnshrinedMaterial.FirstOrDefaultAsync(x => x.Id == request.MaterialId,cancellationToken);

            if (enshrinedMaterial == null) throw new System.Exception("Error");

            var product = await _ctx.Parties.FirstOrDefaultAsync(x => x.Name == enshrinedMaterial.NameParty,cancellationToken);

           
                var unit = await _ctx.Units.FirstOrDefaultAsync(x => x.Name == enshrinedMaterial.Unit,cancellationToken);
                if (unit == null) throw new System.Exception("Error");

                var account = await _ctx.ProductsGroupAccount
                .FirstOrDefaultAsync(x => x.AccountName == enshrinedMaterial.AccountName,cancellationToken);

            if (product == null)
            {
                var material = new ProductEntity
                {
                    Account = account,
                    Unit = unit,
                    Name = enshrinedMaterial.NameMaterial
                };

                _ctx.Parties.Add(
                new PartyEntity()
                {
                    Name = enshrinedMaterial.NameParty,
                    PartyDate = enshrinedMaterial.PartyDate,
                    Price = enshrinedMaterial.Price / (decimal)enshrinedMaterial.Count,
                    Count = enshrinedMaterial.Count,
                    DateCreated = enshrinedMaterial.DateCreated,
                    Product = material
                });
            }
            else
            {
                var par = await _ctx.Parties.FirstOrDefaultAsync(x => x.Name == enshrinedMaterial.NameParty,cancellationToken);
                par!.Count += enshrinedMaterial.Count;
                _ctx.Parties.Update(par);
            }
            _ctx.EnshrinedMaterial.Remove(enshrinedMaterial);
           return  _ctx.SaveChangesAsync(cancellationToken).Result;
        }
    }
}