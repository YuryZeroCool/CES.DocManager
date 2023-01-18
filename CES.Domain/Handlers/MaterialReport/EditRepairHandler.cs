using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

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

            var repair = await _ctx.DecommissionedMaterials.FindAsync(request.RepairId);

            if (repair == null) throw new System.Exception("Error");

            var date = JsonSerializer.Deserialize<List<AddDecomissioneMaterial>>(repair.Materials);
            
                throw new NotImplementedException();

        }
    }
}
