using CES.Domain.Models.Response.Mes.Organizations;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Organization
{
    public class EditOrganizationRequest : Organization, IRequest<EditOrganizationResponse>
    { }
}
