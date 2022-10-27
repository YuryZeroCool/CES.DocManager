using CES.Domain.Models.Response.MaterialReport;
using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class GetAllDecommissionedMaterialsRequest : IRequest<List<GetAllDecommissionedMaterialsResponse>> { }
}
