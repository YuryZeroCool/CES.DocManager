using CES.Domain.Models.Response.Mes.Contracts;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Contracts
{
	public class GetContractsByOrganizationRequest : IRequest<GetContractsByOrganizationResponse>
	{
		public string OrganizationName { get; set; } = string.Empty;

		public DateTime Date { get; set; }

		public string? Street { get; set; }

		public string? HouseNumber { get; set; }
	}
}
