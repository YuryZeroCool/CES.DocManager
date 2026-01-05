using CES.Domain.Models.Response.Mes.Organizations;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Organization
{
    public class GetNextContractNumberRequest : IRequest<GetNextContractNumberResponse>
    {
       
        public string OrganizationName { get; set; } = "";

        public DateTime Date { get; set; }

        public string ContractType { get; set; } = "";
    }
}