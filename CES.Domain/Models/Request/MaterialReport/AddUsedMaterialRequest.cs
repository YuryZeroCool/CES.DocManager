using CES.Domain.Models.Response.MaterialReport;
using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class AddUsedMaterialRequest : IRequest<AddUsedMaterialResponse>
    {
        public string? PartyName { get; set; }

        public double Count { get; set; }
    }
}
