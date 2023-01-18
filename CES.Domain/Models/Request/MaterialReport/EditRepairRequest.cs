using MediatR;
using Microsoft.AspNetCore.JsonPatch;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class EditRepairRequest : IRequest<int>
    {
        public int RepairId { get; set; }

        public JsonPatchDocument? Repair { get; set; }
    }
}
