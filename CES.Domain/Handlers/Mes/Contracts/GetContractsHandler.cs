using CES.Domain.Models;
using CES.Domain.Models.Request.Mes.Contracts;
using CES.Domain.Models.Request.Mes.Organization;
using CES.Domain.Models.Response.Mes.Contracts;
using CES.Domain.Services;
using MediatR;
using CES.Infra;
using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Contracts
{
    public class GetContractsHandler : IRequestHandler<GetContractsRequest, GetContractsResponse>
	{
		private readonly DocMangerContext _ctx;

		public GetContractsHandler(DocMangerContext ctx)
		{
			_ctx = ctx;
		}

    public async Task<GetContractsResponse> Handle(GetContractsRequest request, CancellationToken cancellationToken)
    {
      if (_ctx is not null
        && _ctx.Contracts is not null
        && request is not null)
      {
        IQueryable<ContractEntity> query = _ctx.Contracts
          .Include(c => c.Organization)
            .ThenInclude(o => o!.OrganizationType)
          .Include(c => c.ContractType);

        if (!string.IsNullOrEmpty(request.ContractType))
        {
          query = query.Where(c => c.ContractType != null &&
                              c.ContractType.Name.Trim() == request.ContractType.Trim());
        }

        query = request.Filter switch
        {
          "organization" => query.Where(c => c.Organization != null &&
                                            c.Organization.Name.ToUpper().Trim().Contains(request.SearchValue.ToUpper().Trim())),
          "isNotPrinted" => query.Where(c => !c.IsPrinted),
          _ => query
        };

        query = query.Where(c => c.CreationDate.Date >= request.Min.Date && c.CreationDate.Date <= request.Max.Date);

        var contracts = await query.ToListAsync(cancellationToken);

        if (contracts.Count == 0)
        {
          return new GetContractsResponse
          {
            contractsList = new List<ContractBaseModel>()
          };
        }

        var contractIds = contracts.Select(c => c.Id).ToList();
        var actsCountByContractId = _ctx.Act is null
          ? new Dictionary<int, int>()
          : await _ctx.Act
              .Where(a => a.ContractId != null && contractIds.Contains(a.ContractId.Value))
              .GroupBy(a => a.ContractId!.Value)
              .Select(g => new { ContractId = g.Key, Count = g.Count() })
              .ToDictionaryAsync(x => x.ContractId, x => x.Count, cancellationToken);

        var contractsList = contracts.Select(c => new ContractBaseModel
        {
          Id = c.Id,
          ContractType = c.ContractType?.Name ?? string.Empty,
          OrganizationName = c.Organization?.Name ?? string.Empty,
          ContractNumber = c.ContractNumber,
          CreationDate = c.CreationDate,
          StartDateOfWork = c.StartDateOfWork,
          EndDateOfWork = c.EndDateOfWork,
          ExpirationDate = c.ExpirationDate,
          IsPrinted = c.IsPrinted,
          ActsCount = actsCountByContractId.GetValueOrDefault(c.Id, 0),
          HasLinkedAct = actsCountByContractId.GetValueOrDefault(c.Id, 0) > 0,
          Organization = c.Organization != null ? new Organization
          {
            Id = c.Organization.Id,
            Name = c.Organization.Name,
            PayerAccountNumber = c.Organization.PayerAccountNumber,
            Address = c.Organization.Address,
            Email = c.Organization.Email,
            Phone = c.Organization.Phone,
            OrganizationType = c.Organization.OrganizationType?.Name ?? string.Empty
          } : null
        })
        .ToList();

        var sortedData = ContractNumberSort.OrderByContractNumber(contractsList, c => c.ContractNumber).ToList();

        return new GetContractsResponse
        {
          contractsList = sortedData
        };
    }
      throw new System.Exception("Упс! Что-то пошло не так");
    }
  }
}
