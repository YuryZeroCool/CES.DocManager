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
            var product = await _ctx.Products.FirstOrDefaultAsync(x => x.Id == request.MaterialId);

            if (product == null) throw new System.Exception("Материал не найден");

            _ctx.Remove(product);
            await _ctx.SaveChangesAsync();
            return await Task.FromResult(product.Id);  
        }
    }
}
