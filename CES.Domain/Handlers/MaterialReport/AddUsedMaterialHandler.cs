using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.Formula.Functions;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class AddUsedMaterialHandler : IRequestHandler<AddUsedMaterialRequest, AddUsedMaterialResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public AddUsedMaterialHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;   
        }
        public async  Task<AddUsedMaterialResponse> Handle(AddUsedMaterialRequest request, CancellationToken cancellationToken)
        {
            UsedMaterialEntity? data;

            var party = await _ctx.Parties.FirstOrDefaultAsync(x => x.Name == request.PartyName, cancellationToken);

            if (party == null || party.ProductId == 0) throw new System.Exception("Error");

            var product = await _ctx.Products
                .Include(p => p.Unit)
                .Include(p => p.Account)
                .Include(p => p.Parties)
                .FirstOrDefaultAsync(x => x.Id == party.ProductId, cancellationToken);

            if (product == null || product.Parties == null || product.Parties.Count == 0) throw new System.Exception("Error");

            if (party.Count == request.Count)
            {
                _ctx.Parties.Remove(party);

                if (product.Parties.Count == 1)
                {
                    _ctx.Products.Remove(product);
                }
            }
            else
            {
                 party.Count -= request.Count;

                if (party.Count < 0) throw new System.Exception("Error");

                _ctx.Parties.Update(party);
            }
            await _ctx.SaveChangesAsync(cancellationToken);

            var currentDate = DateTime.UtcNow;
            currentDate = new DateTime(currentDate.Year, currentDate.Month, 1).AddMonths(-1);

            if (!_ctx.UsedMaterials.Any(x => x.Period == currentDate))
            {
                await _ctx.UsedMaterials.AddAsync(new UsedMaterialEntity()
                {
                    Period = currentDate,
                    Materials = JsonSerializer.SerializeToUtf8Bytes(
                    new List<UsedMaterial>
                    {
                        new UsedMaterial
                        {
                            Id = party.Id,
                            NameMaterial = product!.Name,
                            NameParty = party.Name,
                            Count = request.Count,
                            Price = party.Price,
                            Unit = product.Unit!.Name,
                            PartyDate = party.PartyDate,
                        }
                    })

                }, cancellationToken);
            }
            else
            {
                data = await _ctx.UsedMaterials.FirstOrDefaultAsync(x => x.Period == currentDate, cancellationToken);

                if (data == null) throw new SystemException("Error");

                var res = JsonSerializer.Deserialize<List<UsedMaterial>>(data.Materials);

                if (res == null) throw new SystemException("Error");

                var index = res.FindIndex(x => x.NameParty == request.PartyName);

                if (index == -1) 
                {
                    res.Add(new UsedMaterial
                    {
                        Id = party.Id,
                        NameMaterial = product!.Name,
                        NameParty = party.Name,
                        Count = request.Count,
                        Price = party.Price,
                        Unit = product.Unit!.Name,
                        PartyDate = party.PartyDate,
                    });
                }
                else
                {
                    res[index].Count += request.Count;
                }
           
                data.Materials = JsonSerializer.SerializeToUtf8Bytes(res);
                _ctx.UsedMaterials.Update(data);
            }
            await _ctx.SaveChangesAsync(cancellationToken);

            var updatedMaterial = await _ctx.UsedMaterials.FirstOrDefaultAsync(x => x.Period == currentDate, cancellationToken);

            var lastMaterial = JsonSerializer.Deserialize<List<UsedMaterial>>(updatedMaterial!.Materials);

            if (lastMaterial == null) throw new SystemException("Error");
                
            return await Task.FromResult(_mapper.Map<AddUsedMaterialResponse>(lastMaterial.FirstOrDefault(x => x.NameParty == request.PartyName)));
        }
    }
}
