using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.MaterialReport
{
    public class AllDeleteMaterialsHandler : IRequestHandler<AllDeleteMaterialsRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public AllDeleteMaterialsHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<int> Handle(AllDeleteMaterialsRequest request, CancellationToken cancellationToken)
        {
            _ctx.Parties.RemoveRange(_ctx.Parties);
            _ctx.Products.RemoveRange(_ctx.Products);
            _ctx.EnshrinedMaterial.RemoveRange(_ctx.EnshrinedMaterial);
            _ctx.DecommissionedMaterials.RemoveRange(_ctx.DecommissionedMaterials);
            _ctx.UsedMaterials.RemoveRange(_ctx.UsedMaterials);


            _ctx.Units.RemoveRange(_ctx.Units);
            _ctx.ProductsGroupAccount.RemoveRange(_ctx.ProductsGroupAccount);


            await _ctx.SaveChangesAsync(cancellationToken);
            return await Task.FromResult(200);
        }
    }
}
