using CES.Domain.Models.Response.Act;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Acts
{
    public class GetActsRequest : IRequest<List<GetActsResponse>>
    {
        public DateTime Min { get; set; }

        public DateTime Max { get; set; }
    }
}
