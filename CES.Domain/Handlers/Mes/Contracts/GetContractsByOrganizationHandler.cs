using CES.Domain.Models;
using CES.Domain.Models.Request.Mes.Contracts;
using CES.Domain.Models.Response.Mes.Contracts;
using CES.Domain.Services;
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
			var organizationName = request.OrganizationName.Trim();

			var contracts = await _ctx.Contracts
				.Include(c => c.Organization)
				.Include(c => c.ContractType)
				.Include(c => c.Acts!)
					.ThenInclude(a => a.Notes!)
						.ThenInclude(n => n.Street)
				.Include(c => c.Acts!)
					.ThenInclude(a => a.Notes!)
						.ThenInclude(n => n.HouseNumber)
				.Where(c => c.Organization != null &&
				           c.Organization.Name.Trim() == organizationName &&
				           c.ContractType != null)
				.ToListAsync(cancellationToken);

			var matchedContracts = contracts
				.Where(c => MatchesContractForActDate(c, requestDate))
				.Where(c => MatchesContractForActAddress(c, request.Street, request.HouseNumber))
				.ToList();

			var contractsList = matchedContracts
				.Select(c => new ContractBaseModel
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
				})
				.ToList();

			contractsList = ContractNumberSort.OrderByContractNumber(contractsList, c => c.ContractNumber).ToList();

			return new GetContractsByOrganizationResponse
			{
				Contracts = contractsList
			};
		}

		private static bool MatchesContractForActDate(ContractEntity contract, DateTime actDate)
		{
			var contractType = contract.ContractType?.Name.Trim() ?? string.Empty;

			if (contractType == "Годовой")
			{
				return contract.ExpirationDate.HasValue
					&& contract.CreationDate.Date <= actDate
					&& contract.ExpirationDate.Value.Date >= actDate;
			}

			if (contractType == "Разовый")
			{
				if (!contract.EndDateOfWork.HasValue)
				{
					return false;
				}

				var periodStart = (contract.StartDateOfWork ?? contract.CreationDate).Date;
				var periodEnd = contract.EndDateOfWork.Value.Date;

				return IsDateWithinInclusivePeriod(actDate, periodStart, periodEnd);
			}

			return false;
		}

		private static bool IsDateWithinInclusivePeriod(DateTime date, DateTime start, DateTime end)
		{
			if (start <= end)
			{
				return start <= date && date <= end;
			}

			return date >= start || date <= end;
		}

		private static bool MatchesContractForActAddress(
			ContractEntity contract,
			string? street,
			string? houseNumber)
		{
			if (contract.ContractType?.Name.Trim() != "Разовый")
			{
				return true;
			}

			var acts = contract.Acts?.ToList() ?? new List<ActEntity>();
			if (acts.Count == 0)
			{
				return true;
			}

			if (string.IsNullOrWhiteSpace(street) || string.IsNullOrWhiteSpace(houseNumber))
			{
				return true;
			}

			var requestAddress = NoteWorkAddressComparer.FromNames(street, houseNumber);
			var existingNotes = acts
				.SelectMany(a => a.Notes ?? Enumerable.Empty<NoteEntity>())
				.ToList();

			if (existingNotes.Count == 0)
			{
				return true;
			}

			return existingNotes.Any(note =>
				NoteWorkAddressComparer.Equals(NoteWorkAddressComparer.FromNote(note), requestAddress));
		}
	}
}
