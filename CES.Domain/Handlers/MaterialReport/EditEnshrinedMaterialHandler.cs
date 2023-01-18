using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class EditEnshrinedMaterialHandler : IRequestHandler<EditEnshrinedMaterialRequest, EditEnshrinedMaterialResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;
        
        public EditEnshrinedMaterialHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<EditEnshrinedMaterialResponse> Handle(EditEnshrinedMaterialRequest request, CancellationToken cancellationToken)
        {
            var material =  await _ctx.EnshrinedMaterial.FindAsync(request.Id, cancellationToken);

            if (material == null) throw new System.Exception("Error");

            var countNew = material.Count;

            request.EnshrinedMaterial!.ApplyTo(material);
            await _ctx.SaveChangesAsync(cancellationToken);

            countNew -= material.Count;

            var res = await _ctx.Parties.FirstOrDefaultAsync(x=>x.Name == material.NameParty,cancellationToken);

            if(res == null) // Если не существует партии
            {
                var nameMaterial = await _ctx.Products
                    .FirstOrDefaultAsync(x=>x.Name == material.NameMaterial, cancellationToken);

                if (nameMaterial == null) // Если не существует материала
                {
                    nameMaterial = new ProductEntity()
                    {
                        Name = material.NameMaterial,
                        Account = _ctx.ProductsGroupAccount
                            .FirstOrDefaultAsync(x=>x.AccountName == material.AccountName,cancellationToken).Result,
                        Unit = _ctx.Units
                            .FirstOrDefaultAsync(x => x.Name == material.Unit, cancellationToken).Result,
                    };
                } 
                
                await _ctx.Parties.AddAsync(
                    new PartyEntity()
                    {
                        Name = material.NameParty,
                        PartyDate = material.PartyDate,
                        Price = material.Price,
                        Count = countNew,
                        DateCreated = material.DateCreated,
                        Product = nameMaterial,
                        TotalSum = material.Price * (decimal)countNew,
                    }, cancellationToken);

                await _ctx.SaveChangesAsync(cancellationToken);
               
            }
            else
            {
                res.Count += countNew;
                if( res.Count == 0)
                {
                    _ctx.Parties.Remove(res);
                }
                else
                {
                    res.TotalSum = material.Price * (decimal)countNew;
                    _ctx.Parties.Update(res);
                }
                await _ctx.SaveChangesAsync(cancellationToken);
            }

            return await Task.FromResult(_mapper.Map<EditEnshrinedMaterialResponse>(material));
        }
    }
}
