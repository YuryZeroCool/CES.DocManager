using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Services;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class DeleteEnshrinedMaterialHandler : IRequestHandler<DeleteEnshrinedMaterialRequest, int>
    {
        private readonly DocMangerContext _ctx;

        private readonly ICurrentUserRole _currentUserRole;

        public DeleteEnshrinedMaterialHandler(DocMangerContext ctx, ICurrentUserRole currentUserRole)
        {
            _ctx = ctx;
            _currentUserRole = currentUserRole;
        }
        public async Task<int> Handle(DeleteEnshrinedMaterialRequest request, CancellationToken cancellationToken)
        {
            var enshrinedMaterial = await _ctx.EnshrinedMaterial.FirstOrDefaultAsync(x => x.Id == request.MaterialId, cancellationToken);

            if (enshrinedMaterial == null) throw new System.Exception("Упс! Что-то пошло не так");

            var ownerRole = string.IsNullOrWhiteSpace(enshrinedMaterial.OwnerRole)
                ? "admin"
                : enshrinedMaterial.OwnerRole;
            MaterialOwnerRole.EnsureOwn(_currentUserRole.GetRole(), ownerRole);

            var party = await _ctx.Parties.FirstOrDefaultAsync(x =>
                x.Name == enshrinedMaterial.NameParty
                && x.Product!.Name == enshrinedMaterial.NameMaterial
                && x.Product.OwnerRole == ownerRole
                && x.Product.Account!.AccountName == enshrinedMaterial.AccountName, cancellationToken);

            var unit = await _ctx.Units.FirstOrDefaultAsync(x => x.Name == enshrinedMaterial.Unit, cancellationToken);
            if (unit == null) throw new System.Exception("Упс! Что-то пошло не так");

            var account = await _ctx.ProductsGroupAccount
            .FirstOrDefaultAsync(x => x.AccountName == enshrinedMaterial.AccountName, cancellationToken);

            if (party == null)
            {
                var material = _ctx.Products.FirstOrDefault(x => x.Name == enshrinedMaterial.NameMaterial &&
                 x.Account!.AccountName == enshrinedMaterial.AccountName &&
                 x.OwnerRole == ownerRole);

                if (material == null)
                {
                    material = new ProductEntity
                    {
                        Account = account,
                        Unit = unit,
                        Name = enshrinedMaterial.NameMaterial,
                        OwnerRole = ownerRole
                    };
                }

                _ctx.Parties.Add(
                new PartyEntity()
                {
                    Name = enshrinedMaterial.NameParty,
                    PartyDate = enshrinedMaterial.PartyDate,
                    Price = enshrinedMaterial.Price,
                    Count = enshrinedMaterial.Count,
                    DateCreated = enshrinedMaterial.DateCreated,
                    Product = material,
                    TotalSum = (decimal)enshrinedMaterial.Count * enshrinedMaterial.Price
                });
            }
            else
            {
                party.Count += enshrinedMaterial.Count;
                party.TotalSum = (decimal)party.Count * party.Price;
                _ctx.Parties.Update(party);
            }
            _ctx.EnshrinedMaterial.Remove(enshrinedMaterial);
            return _ctx.SaveChangesAsync(cancellationToken).Result;
        }
    }
}
