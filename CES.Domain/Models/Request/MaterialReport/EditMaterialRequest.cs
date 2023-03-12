using CES.Domain.Models.Response.MaterialReport;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class EditMaterialRequest : IRequest<EditMaterialResponse>
    {
        public int PartyId { get; set; }

        public JsonPatchDocument? EditedMaterial { get; set; }
    }
}
