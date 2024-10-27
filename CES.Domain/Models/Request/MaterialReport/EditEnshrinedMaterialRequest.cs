using CES.Domain.Models.Response.MaterialReport;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class EditEnshrinedMaterialRequest : IRequest<EditEnshrinedMaterialResponse>
    {
        public int Id { get; set; }

        public JsonPatchDocument? EnshrinedMaterial { get; set; }
    }
}
