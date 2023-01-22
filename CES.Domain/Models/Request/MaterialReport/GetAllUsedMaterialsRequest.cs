using CES.Domain.Models.Response.MaterialReport;
using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class GetAllUsedMaterialsRequest : IRequest<List<GetAllUsedMaterialsResponse>>
    {
        public int Month { get; set; }

        public int Year { get; set; }
    }
}
