using CES.Domain.Models.Response.Act;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Acts
{
    public class GetActsRequest : IRequest<GetActsResponse>
    {
        public DateTime Min { get; set; }

        public DateTime Max { get; set; }

        public string OrganizationType { get; set; } = string.Empty;

        public string SearchValue { get; set; } = string.Empty;

        public string Filter { get; set; } = string.Empty;
    }
}
