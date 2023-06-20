using CES.Domain.Models.Response.Mes;
using MediatR;

namespace CES.Domain.Models.Request.Mes
{
    public class CreateOrganizationRequest : IRequest<CreateOrganizationResponse>
    {
        public string? Name { get; set; }

        public string? PayerAccountNumber { get; set; }

        public string? Address { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }
}
