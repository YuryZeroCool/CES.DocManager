using CES.Domain.Models.Response.Mes;
using MediatR;

namespace CES.Domain.Models.Request.Mes
{
    public class EditOrganizationRequest : Organization, IRequest <EditOrganizationResponse>
    {
        public int Id { get; set; }
    }
}
