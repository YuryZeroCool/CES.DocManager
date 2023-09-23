using MediatR;

namespace CES.Domain.Models.Request.Mes
{
    public class DeleteOrganizationRequest : IRequest<int>
    {
        public int Id { get; set; }
    }
}
