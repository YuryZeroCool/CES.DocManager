using System;
namespace CES.Domain.Models.Response.Mes.Contracts
{
	public class GetContractsByOrganizationResponse
	{
		public List<ContractBaseModel> Contracts { get; set; } = new List<ContractBaseModel>();
	}
}
