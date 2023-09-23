using CES.Domain.Models.Response.Act;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Acts
{
    public class GetActTypesFromFileRequest : IRequest<IEnumerable<GetActTypesFromFileResponse>> { }
}
