using CES.Domain.Models.Response.Mes;
using MediatR;

namespace CES.Domain.Models.Request.Mes
{
    public class SearchOrganizationRequest : IRequest<SearchOrganizationResponse>
    {
        public string Title { get; set; }

        public int Limit { get; set; }

        public int Page { get; set;}
    }
}
