using CES.Domain.Models.Response.Mes;
using MediatR;

namespace CES.Domain.Models.Request.Mes
{
    public class OrganizationsBySearchRequest : IRequest<List<string>>
    {
        public string? Title { get; set; }
    }
}
