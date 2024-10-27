using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class DeleteMaterialHandler : IRequestHandler<DeleteMaterialRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public DeleteMaterialHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<int> Handle(DeleteMaterialRequest request, CancellationToken cancellationToken)
        {
            var material = await _ctx.Parties.FirstOrDefaultAsync(x => x.Id == request.MaterialId, cancellationToken);

            if (material == null) throw new System.Exception("Материал не найден");

            var product = await _ctx.Products
                .Include(p => p.Parties)
                .FirstOrDefaultAsync(x => x.Id == material.ProductId, cancellationToken);

            if (product == null) throw new System.Exception("Материал не найден");

            if (product.Parties!.Count > 1)
            {
                _ctx.Parties.Remove(material);
            }
            else
            {
                _ctx.Parties.Remove(material);
                _ctx.Products.Remove(product);
            }
            await _ctx.SaveChangesAsync(cancellationToken);
            return await Task.FromResult(material.Id);
        }
    }
}
