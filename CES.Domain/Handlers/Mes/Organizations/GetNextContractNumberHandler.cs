using AutoMapper;
using CES.Domain.Models.Request.Mes.Organization;
using CES.Domain.Models.Response.Mes.Organizations;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.RegularExpressions;

namespace CES.Domain.Handlers.Mes.Organizations
{
    public class GetNextContractNumberHandler : IRequestHandler<GetNextContractNumberRequest, GetNextContractNumberResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetNextContractNumberHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        private static int? GetFirstMissingNumber(List<int> numbers)
        {
            if (numbers == null || numbers.Count == 0)
            {
                return 1;
            }

            var sortedNumbers = numbers.OrderBy(n => n).ToList();
            
            if (sortedNumbers[0] != 1)
            {
                return 1;
            }

            for (int i = 0; i < sortedNumbers.Count - 1; i++)
            {
                if (sortedNumbers[i + 1] - sortedNumbers[i] > 1)
                {
                    return sortedNumbers[i] + 1;
                }
            }

            return sortedNumbers.Max() + 1;
        }

        public async Task<GetNextContractNumberResponse> Handle(GetNextContractNumberRequest request, CancellationToken cancellationToken)
        {

            if (_ctx.OrganizationEntities is null
                || _ctx.ContractTypes is null
                || _ctx.Contracts is null
                ) throw new System.Exception("Упс! Что-то пошло не так");

            if (request.ContractType == "Годовой")
            {
                var organization = await _ctx.OrganizationEntities.
                    FirstOrDefaultAsync(x => x.Name.Trim() == request.OrganizationName.Trim(), cancellationToken)
                    ?? throw new System.Exception("Упс! Что-то пошло не так");

                var contractType = await _ctx.ContractTypes.
                    FirstOrDefaultAsync(x => x.Name.Trim() == request.ContractType.Trim(), cancellationToken)
                    ?? throw new System.Exception("Упс! Что-то пошло не так");

                var contracts = await _ctx.Contracts.Where(x => x.OrganizationId == organization.Id)
                    .Where(x => x.ContractTypeId == contractType.Id)
                    .OrderBy(x => x.CreationDate)
                    .ToListAsync(cancellationToken: cancellationToken);

                var activeContract = contracts.FirstOrDefault(c => 
                    request.Date >= c.CreationDate && 
                    (c.ExpirationDate is not null
                     && request.Date <= c.ExpirationDate.Value));

                if (activeContract != null)
                {
                  return new GetNextContractNumberResponse()
                  {
                    Exist = true,
                  };
                }
            }

            var currentYear = DateTime.Now.Year;
            var contractsForCurrentYear = await _ctx.Contracts
                .Where(x => x.CreationDate.Year == currentYear)
                .ToListAsync(cancellationToken: cancellationToken);

            var contractNumbers = new List<int>();

            foreach (var contract in contractsForCurrentYear)
            {
                var match = Regex.Match(contract.ContractNumber, @"^(\d+)/");
                if (match.Success && match.Groups.Count > 1 && int.TryParse(match.Groups[1].Value, out int number))
                {
                    contractNumbers.Add(number);
                }
            }

            var nextNumber = GetFirstMissingNumber(contractNumbers);

            return new GetNextContractNumberResponse()
            {
                Exist = false,
                NextContractNumber = nextNumber?.ToString(),
            };
        }
    }
}