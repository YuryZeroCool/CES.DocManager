using CES.Domain.Models.Response.Mes.Organizations;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Organization
{
    public class SearchOrganizationRequest : IRequest<SearchOrganizationResponse>
    {
        public string Title { get; set; }

        public int Limit { get; set; }

        public int Page { get; set; }
    }
}
