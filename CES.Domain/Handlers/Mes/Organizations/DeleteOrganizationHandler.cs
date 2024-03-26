using CES.Domain.Models.Request.Mes.Organization;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Organizations
{
    public class DeleteOrganizationHandler : IRequestHandler<DeleteOrganizationRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public DeleteOrganizationHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<int> Handle(DeleteOrganizationRequest request, CancellationToken cancellationToken)
        {
            var organization = await _ctx.OrganizationEntities.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (organization == null) throw new System.Exception("Error");
            var res = _ctx.OrganizationEntities.Remove(organization);
            await _ctx.SaveChangesAsync(cancellationToken);
            return await Task.FromResult(res.Entity.Id);
        }
    }
}
