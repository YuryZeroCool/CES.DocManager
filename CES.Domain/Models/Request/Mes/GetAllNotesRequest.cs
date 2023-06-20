using CES.Domain.Models.Response.Mes;
using MediatR;

namespace CES.Domain.Models.Request.Mes
{
    public class GetAllNotesRequest : IRequest<List<GetAllNotesResponse>>
    {
    }
}
