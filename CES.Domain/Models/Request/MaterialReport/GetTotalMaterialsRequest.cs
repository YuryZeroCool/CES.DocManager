using CES.Domain.Models.Response.MaterialReport;
using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class GetTotalMaterialsRequest : IRequest<List<GetTotalMaterialsResponse>>
    {
        public string? Accounts { get; set; }
    }
}
