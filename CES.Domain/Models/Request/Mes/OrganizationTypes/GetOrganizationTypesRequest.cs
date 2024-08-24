using CES.Domain.Models.Response.Mes.OrganizationTypes;
using MediatR;

namespace CES.Domain.Models.Request.Mes.OrganizationTypes
{
    public class GetOrganizationTypesRequest : IRequest<List<GetOrganizationTypesResponse>>
    {
    }
}
