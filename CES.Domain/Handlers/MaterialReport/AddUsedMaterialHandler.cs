using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
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

        public AddUsedMaterialHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;   
        }
        public async  Task<AddUsedMaterialResponse> Handle(AddUsedMaterialRequest request, CancellationToken cancellationToken)
        {
            UsedMaterialEntity? data;

            var party = await _ctx.Parties.Include(x => x.Product!.Unit).FirstOrDefaultAsync(x => x.Name == request.PartyName, cancellationToken);

            if (party == null)  throw new SystemException("Error");

            if (party.Count == request.Count)
            {
                _ctx.Parties.Remove(party);

                if (party.Product != null)
                {
                    _ctx.Products.Remove(party.Product);
                }
            }
            else
            {
                 party.Count -= request.Count;
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
                            NameMaterial = party.Product!.Name,
                            NameParty = party.Name,
                            Count = request.Count,
                            Price = party.Price,
                            Unit = party.Product.Unit!.Name,
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
                        NameMaterial = party.Product!.Name,
                        NameParty = party.Name,
                        Count = request.Count,
                        Price = party.Price,
                        Unit = party.Product.Unit!.Name,
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

            var updataMaterial = await _ctx.UsedMaterials.FirstOrDefaultAsync(x => x.Period == currentDate);

            var lastMaterial = JsonSerializer.Deserialize<List<UsedMaterial>>(updataMaterial!.Materials);

            if (lastMaterial == null) throw new SystemException("Error");
                
            return await Task.FromResult(_mapper.Map<AddUsedMaterialResponse>(lastMaterial.FirstOrDefault(x => x.NameParty == request.PartyName)));
        }
    }
}
