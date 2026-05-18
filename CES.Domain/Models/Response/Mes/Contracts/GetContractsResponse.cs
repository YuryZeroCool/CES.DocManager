namespace CES.Domain.Models.Response.Mes.Contracts
{
  public class GetContractsResponse
  {
    public List<ContractBaseModel> contractsList { get; set; } = new();
  }
}
