using CES.Domain.Models.Response.CommonInfo;
using MediatR;

namespace CES.Domain.Models.Request.CommonInfo
{
    public class GetCommonInfoRequest : IRequest<IEnumerable<GetAllCommonInfoResponse>> { }
}
