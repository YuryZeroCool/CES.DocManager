using CES.Domain.Models.Response.Mes.Contracts;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Contracts
{
  public class GetContractsRequest : IRequest<GetContractsResponse>
  {
    public DateTime Min { get; set; }

    public DateTime Max { get; set; }

    public string ContractType { get; set; } = string.Empty;

    public string SearchValue { get; set; } = string.Empty;

    public string Filter { get; set; } = string.Empty;
  }
}
