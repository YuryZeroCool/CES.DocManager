using MediatR;

namespace CES.Domain.Models.Request.Mes.Organization
{
    public class DeleteOrganizationRequest : IRequest<int>
    {
        public int Id { get; set; }
    }
}
