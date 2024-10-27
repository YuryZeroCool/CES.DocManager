using CES.Domain.Models.Response.MaterialReport;
using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class GetAllEnshrinedMaterialRequest : IRequest<List<GetAllEnshrinedMaterialResponse>> { }
}
