using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Domain.Services;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class AddUsedMaterialHandler : IRequestHandler<AddUsedMaterialRequest, AddUsedMaterialResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        private readonly ICurrentUserRole _currentUserRole;

        public AddUsedMaterialHandler(DocMangerContext ctx, IMapper mapper, ICurrentUserRole currentUserRole)
        {
            _ctx = ctx;
            _mapper = mapper;
            _currentUserRole = currentUserRole;
        }
        public async Task<AddUsedMaterialResponse> Handle(AddUsedMaterialRequest request, CancellationToken cancellationToken)
        {
            var role = _currentUserRole.GetRole();

            var party = await _ctx.Parties.FirstOrDefaultAsync(
                x => x.Name == request.PartyName && x.Product!.OwnerRole == role,
                cancellationToken);

            if (party == null || party.ProductId == 0) throw new System.Exception("Упс! Что-то пошло не так");

            var product = await _ctx.Products
                .Include(p => p.Unit)
                .Include(p => p.Account)
                .Include(p => p.Parties)
                .FirstOrDefaultAsync(x => x.Id == party.ProductId, cancellationToken);

            if (product == null || product.Parties == null || product.Parties.Count == 0) throw new System.Exception("Упс! Что-то пошло не так");

            MaterialOwnerRole.EnsureOwn(role, product.OwnerRole);

            var difference = Math.Abs(party.Count * .00001);
            var isFullWriteOff = Math.Abs(party.Count - request.Count) <= difference;
            if (!isFullWriteOff && request.Count > party.Count)
            {
                throw new System.Exception("Упс! Что-то пошло не так");
            }

            var currentDate = DateTime.UtcNow;
            currentDate = new DateTime(currentDate.Year, currentDate.Month, 1).AddMonths(-1);

            var data = await _ctx.UsedMaterials.FirstOrDefaultAsync(x => x.Period == currentDate, cancellationToken);
            UsedMaterial used;

            if (data == null)
            {
                used = CreateUsedMaterial(party, product, request.Count);
                await _ctx.UsedMaterials.AddAsync(new UsedMaterialEntity()
                {
                    Period = currentDate,
                    Materials = JsonSerializer.SerializeToUtf8Bytes(new List<UsedMaterial> { used })
                }, cancellationToken);
            }
            else
            {
                var materials = JsonSerializer.Deserialize<List<UsedMaterial>>(data.Materials);
                if (materials == null) throw new SystemException("Упс! Что-то пошло не так");

                var index = materials.FindIndex(x => x.NameParty == request.PartyName && x.OwnerRole == role);
                if (index == -1)
                {
                    used = CreateUsedMaterial(party, product, request.Count);
                    materials.Add(used);
                }
                else
                {
                    materials[index].Count += request.Count;
                    materials[index].OwnerRole ??= product.OwnerRole;
                    if (string.IsNullOrWhiteSpace(materials[index].AccountName))
                    {
                        materials[index].AccountName = product.Account!.AccountName;
                    }

                    used = materials[index];
                }

                data.Materials = JsonSerializer.SerializeToUtf8Bytes(materials);
                _ctx.UsedMaterials.Update(data);
            }

            if (isFullWriteOff)
            {
                if (product.Parties.Count == 1)
                {
                    _ctx.Products.Remove(party.Product!);
                }
                _ctx.Parties.Remove(party);
            }
            else
            {
                party.Count -= request.Count;
                party.TotalSum -= (decimal)request.Count * party.Price;
                _ctx.Parties.Update(party);
            }

            await _ctx.SaveChangesAsync(cancellationToken);

            return await Task.FromResult(_mapper.Map<AddUsedMaterialResponse>(used));
        }

        private static UsedMaterial CreateUsedMaterial(PartyEntity party, ProductEntity product, double count)
        {
            return new UsedMaterial
            {
                Id = party.Id,
                Count = count,
                NameMaterial = product.Name,
                NameParty = party.Name,
                PartyDate = party.PartyDate,
                Price = party.Price,
                DateCreated = party.DateCreated,
                AccountName = product.Account!.AccountName,
                Unit = product.Unit!.Name,
                OwnerRole = product.OwnerRole,
            };
        }
    }
}
