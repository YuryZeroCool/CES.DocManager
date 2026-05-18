using CES.Domain.Models;
using CES.Domain.Models.Request.Mes.Contracts;
using CES.Domain.Models.Response.Mes.Contracts;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Contracts
{
	public class GetContractsByOrganizationHandler : IRequestHandler<GetContractsByOrganizationRequest, GetContractsByOrganizationResponse>
	{
		private readonly DocMangerContext _ctx;

		public GetContractsByOrganizationHandler(DocMangerContext ctx)
		{
			_ctx = ctx;
		}

		public async Task<GetContractsByOrganizationResponse> Handle(GetContractsByOrganizationRequest request, CancellationToken cancellationToken)
		{
			if (_ctx.Contracts is null || _ctx.OrganizationEntities is null)
			{
				throw new System.Exception("Упс! Что-то пошло не так");
			}

			var requestDate = request.Date.Date;

			var contracts = await _ctx.Contracts
				.Include(c => c.Organization)
				.Include(c => c.ContractType)
				.Where(c => c.Organization != null &&
				           c.Organization.Name.Trim() == request.OrganizationName.Trim() &&
				           c.ContractType != null &&
						   ((c.ContractType.Name.Trim() == "Разовый" &&
							 c.CreationDate.Year == requestDate.Year &&
							 c.CreationDate.Month == requestDate.Month &&
							 c.CreationDate.Day == requestDate.Day) ||
							(c.ContractType.Name.Trim() == "Годовой" &&
							 c.ExpirationDate.HasValue &&
							 c.CreationDate.Date <= requestDate &&
							 c.ExpirationDate.Value.Date >= requestDate)))
				.ToListAsync(cancellationToken);

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
				IsPrinted = c.IsPrinted
			}).ToList();

			return new GetContractsByOrganizationResponse
			{
				Contracts = contractsList
			};
		}
	}
}
