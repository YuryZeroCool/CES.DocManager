using CES.Domain.Models.Response.Mes.Organizations;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Organization
{
    public class CreateOrganizationRequest : Organization, IRequest<CreateOrganizationResponse>
    { }
}
