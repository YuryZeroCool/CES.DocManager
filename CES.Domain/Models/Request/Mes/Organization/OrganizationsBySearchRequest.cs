using MediatR;

namespace CES.Domain.Models.Request.Mes.Organization
{
    public class OrganizationsBySearchRequest : IRequest<List<string>>
    {
        public string? Title { get; set; }
    }
}
