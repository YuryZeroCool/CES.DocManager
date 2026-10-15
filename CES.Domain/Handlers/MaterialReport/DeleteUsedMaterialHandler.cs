using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Services;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class DeleteUsedMaterialHandler : IRequestHandler<DeleteUsedMaterialRequest, int>
    {
        private readonly DocMangerContext _ctx;

        private readonly ICurrentUserRole _currentUserRole;

        public DeleteUsedMaterialHandler(DocMangerContext ctx, ICurrentUserRole currentUserRole)
        {
            _ctx = ctx;
            _currentUserRole = currentUserRole;
        }

        public async Task<int> Handle(DeleteUsedMaterialRequest request, CancellationToken cancellationToken)
        {
            var role = _currentUserRole.GetRole();
            var data = await _ctx.UsedMaterials.FirstOrDefaultAsync(x =>
                x.Period.Month == request.Month && x.Period.Year == request.Year, cancellationToken);

            if (data?.Materials == null) throw new System.Exception("Упс! Что-то пошло не так");

            var materials = JsonSerializer.Deserialize<List<UsedMaterial>>(data.Materials);
            if (materials == null) throw new System.Exception("Упс! Что-то пошло не так");

            var index = materials.FindIndex(item =>
            {
                var ownerRole = string.IsNullOrWhiteSpace(item.OwnerRole) ? "admin" : item.OwnerRole;
                return item.Id == request.Id
                    && item.NameParty == request.NameParty
                    && ownerRole == role;
            });

            if (index == -1) throw new System.Exception("Упс! Что-то пошло не так");

            var usedMaterial = materials[index];
            var materialOwnerRole = string.IsNullOrWhiteSpace(usedMaterial.OwnerRole) ? "admin" : usedMaterial.OwnerRole;
            MaterialOwnerRole.EnsureOwn(role, materialOwnerRole);

            var party = await _ctx.Parties.FirstOrDefaultAsync(x =>
                x.Name == usedMaterial.NameParty
                && x.Product!.Name == usedMaterial.NameMaterial
                && x.Product.OwnerRole == materialOwnerRole
                && x.Product.Account!.AccountName == usedMaterial.AccountName, cancellationToken);

            var unit = await _ctx.Units.FirstOrDefaultAsync(x => x.Name == usedMaterial.Unit, cancellationToken);
            if (unit == null) throw new System.Exception("Упс! Что-то пошло не так");

            var account = await _ctx.ProductsGroupAccount
                .FirstOrDefaultAsync(x => x.AccountName == usedMaterial.AccountName, cancellationToken);

            if (party == null)
            {
                var material = await _ctx.Products.FirstOrDefaultAsync(x =>
                    x.Name == usedMaterial.NameMaterial
                    && x.Account!.AccountName == usedMaterial.AccountName
                    && x.OwnerRole == materialOwnerRole, cancellationToken);

                if (material == null)
                {
                    material = new ProductEntity
                    {
                        Account = account,
                        Unit = unit,
                        Name = usedMaterial.NameMaterial,
                        OwnerRole = materialOwnerRole
                    };
                }

                _ctx.Parties.Add(new PartyEntity()
                {
                    Name = usedMaterial.NameParty,
                    PartyDate = usedMaterial.PartyDate,
                    Price = usedMaterial.Price,
                    Count = usedMaterial.Count,
                    DateCreated = usedMaterial.DateCreated,
                    Product = material,
                    TotalSum = (decimal)usedMaterial.Count * usedMaterial.Price
                });
            }
            else
            {
                party.Count += usedMaterial.Count;
                party.TotalSum = (decimal)party.Count * party.Price;
                _ctx.Parties.Update(party);
            }

            materials.RemoveAt(index);
            data.Materials = JsonSerializer.SerializeToUtf8Bytes(materials);
            _ctx.UsedMaterials.Update(data);
            await _ctx.SaveChangesAsync(cancellationToken);

            return usedMaterial.Id;
        }
    }
}
