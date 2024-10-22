using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Domain.Services;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace CES.Domain.Handlers.MaterialReport
{
    public class AddMaterialHandler : IRequestHandler<AddMaterialRequest, AddMaterialResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        private PartyEntity? updatedMaterial = null;

        public AddMaterialHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<AddMaterialResponse> Handle(AddMaterialRequest request, CancellationToken cancellationToken)
        {
            if ( _ctx is not null
                && _ctx.Parties is not null
                && _ctx.Products is not null
                && _ctx.Units is not null
                && _ctx.ProductsGroupAccount is not null
                && request is not null
                && request.Count !=0 
                && !string.IsNullOrEmpty(request.PartyDate) 
                && !string.IsNullOrEmpty(request.partyName)
                && await _ctx.Units.AnyAsync(x => x.Id == request.UnitId, cancellationToken)
                && await _ctx.ProductsGroupAccount.AnyAsync(x => x.Id == request.ProductGroupAccountId, cancellationToken))
            {
                if (await _ctx.Parties.AnyAsync(x => x.Name == request.partyName
                && x.Product!.Name == request.Name, cancellationToken))
                {
                    var material = await _ctx.Parties.FirstOrDefaultAsync(x => x.Name == request.partyName && x.Product!.Name == request.Name, cancellationToken) ?? throw new System.Exception("Упс! Что-то пошло не так");
                    material.Count += request.Count;
                    material.TotalSum = (decimal)material.Count * material.Price;
                    updatedMaterial = _ctx.Parties.Update(material).Entity;
                    await _ctx.SaveChangesAsync(cancellationToken);
                }
                else
                {
                    updatedMaterial = _ctx.Parties.AddAsync(new PartyEntity()
                    {
                        Name = request.partyName,
                        Count = request.Count,
                        DateCreated = DateTime.Now,
                        PartyDate = DateTimeConverter.ConvertToDateTime(request.PartyDate, "yyyy-MM-dd HH:mm:ss"),
                        Price = request.Price,
                        Product = new ProductEntity()
                        {
                            Name = request.Name,
                            ProductGroupAccountId = request.ProductGroupAccountId,
                            UnitId = request.UnitId,
                        },
                        TotalSum = request.Price * (decimal)request.Count,
                    }, cancellationToken).Result.Entity;
                    await _ctx.SaveChangesAsync(cancellationToken);
                }
                if ( updatedMaterial is not null) 
                    {
                        return await Task.FromResult(new AddMaterialResponse()
                        {
                            Id = updatedMaterial.Id,
                            Name = request.Name,
                            PartyDate = updatedMaterial.PartyDate.ToString("dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture),
                            PartyName = updatedMaterial.Name!,
                            ProductGroupAccountId = request.ProductGroupAccountId,
                            UnitId = request.UnitId,
                            Count = updatedMaterial.Count,
                            Price = updatedMaterial.Price,
                            TotalSum = updatedMaterial.TotalSum
                        });
                    }
                    throw new System.Exception("Упс! Что-то пошло не так");
            }
            throw new NotImplementedException();
        }
    }
}