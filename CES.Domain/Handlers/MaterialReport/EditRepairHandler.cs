using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using MediatR;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class EditRepairHandler : IRequestHandler<EditRepairRequest, int>
    {
        private readonly DocMangerContext _ctx;
        public EditRepairHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<int> Handle(EditRepairRequest request, CancellationToken cancellationToken)
        {

            var repair = await _ctx.DecommissionedMaterials.FindAsync(request.RepairId, cancellationToken);

            if (repair == null) throw new System.Exception("Упс! Что-то пошло не так");

            var date = JsonSerializer.Deserialize<List<AddDecommissionedMaterial>>(repair.Materials);
            
            throw new NotImplementedException();

        }
    }
}
