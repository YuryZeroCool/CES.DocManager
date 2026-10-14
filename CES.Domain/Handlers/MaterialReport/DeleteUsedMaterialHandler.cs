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

            await ReturnToStock(usedMaterial, materialOwnerRole, cancellationToken);

            materials.RemoveAt(index);
            data.Materials = JsonSerializer.SerializeToUtf8Bytes(materials);
            _ctx.UsedMaterials.Update(data);
            await _ctx.SaveChangesAsync(cancellationToken);

            return usedMaterial.Id;
        }

        private async Task ReturnToStock(UsedMaterial usedMaterial, string ownerRole, CancellationToken cancellationToken)
        {
            var party = await _ctx.Parties.FirstOrDefaultAsync(x =>
                x.Name == usedMaterial.NameParty
                && x.Product!.Name == usedMaterial.NameMaterial
                && x.Product.OwnerRole == ownerRole, cancellationToken);

            if (party != null)
            {
                party.Count += usedMaterial.Count;
                party.TotalSum = (decimal)party.Count * party.Price;
                _ctx.Parties.Update(party);
                return;
            }

            var products = await _ctx.Products
                .Where(x => x.Name == usedMaterial.NameMaterial && x.OwnerRole == ownerRole)
                .ToListAsync(cancellationToken);

            var product = products.Count == 1 ? products[0] : null;
            if (products.Count > 1)
            {
                throw new System.Exception("Не удалось вернуть материал на склад");
            }

            if (product == null)
            {
                product = await CreateProduct(usedMaterial, ownerRole, cancellationToken);
                await _ctx.Products.AddAsync(product, cancellationToken);
            }

            _ctx.Parties.Add(new PartyEntity
            {
                Name = usedMaterial.NameParty,
                PartyDate = usedMaterial.PartyDate,
                Price = usedMaterial.Price,
                Count = usedMaterial.Count,
                DateCreated = DateTime.Now,
                Product = product,
                TotalSum = (decimal)usedMaterial.Count * usedMaterial.Price
            });
        }

        private async Task<ProductEntity> CreateProduct(UsedMaterial usedMaterial, string ownerRole, CancellationToken cancellationToken)
        {
            var unit = await _ctx.Units.FirstOrDefaultAsync(x => x.Name == usedMaterial.Unit, cancellationToken);
            if (unit == null)
            {
                unit = new UnitEntity { Name = usedMaterial.Unit };
                await _ctx.Units.AddAsync(unit, cancellationToken);
            }

            var accountSource = await _ctx.Products
                .FirstOrDefaultAsync(x => x.Name == usedMaterial.NameMaterial, cancellationToken);

            if (accountSource != null)
            {
                return new ProductEntity
                {
                    Name = usedMaterial.NameMaterial,
                    Unit = unit,
                    ProductGroupAccountId = accountSource.ProductGroupAccountId,
                    OwnerRole = ownerRole
                };
            }

            var accountName = await _ctx.EnshrinedMaterial
                .Where(x => x.NameMaterial == usedMaterial.NameMaterial && x.AccountName != null && x.AccountName != "")
                .Select(x => x.AccountName)
                .FirstOrDefaultAsync(cancellationToken);

            if (string.IsNullOrEmpty(accountName))
            {
                throw new System.Exception("Не удалось вернуть материал на склад");
            }

            var account = await _ctx.ProductsGroupAccount
                .FirstOrDefaultAsync(x => x.AccountName == accountName, cancellationToken);

            if (account == null)
            {
                throw new System.Exception("Не удалось вернуть материал на склад");
            }

            return new ProductEntity
            {
                Name = usedMaterial.NameMaterial,
                Unit = unit,
                ProductGroupAccountId = account.Id,
                OwnerRole = ownerRole
            };
        }
    }
}
