using CES.Domain.Models.Request.Mes.Contracts;
using CES.Domain.Models.Response.Mes.Contracts;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Contracts
{
    public class CreateContractHandler : IRequestHandler<CreateContractRequest, CreateContractResponse>
    {
        private readonly DocMangerContext _ctx;

        public CreateContractHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<CreateContractResponse> Handle(CreateContractRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.OrganizationEntities is null
                || _ctx.ContractTypes is null
                || _ctx.Contracts is null)
            {
                throw new System.Exception("Упс! Что-то пошло не так");
            }

            var organization = await _ctx.OrganizationEntities
                .FirstOrDefaultAsync(x => x.Name.Trim() == request.OrganizationName.Trim(), cancellationToken)
                ?? throw new System.Exception("Организация не найдена");

            var contractType = await _ctx.ContractTypes
                .FirstOrDefaultAsync(x => x.Name.Trim() == request.ContractType.Trim(), cancellationToken)
                ?? throw new System.Exception("Тип договора не найден");

            var contractTypeName = contractType.Name.Trim();
            var isYearly = contractTypeName == "Годовой";
            var isOneTime = contractTypeName == "Разовый";

            if (isYearly && request.ExpirationDate == null)
            {
                throw new System.Exception("Для годового договора необходимо указать дату окончания действия (ExpirationDate)");
            }

            if (isOneTime && (request.StartDateOfWork == null || request.EndDateOfWork == null))
            {
                throw new System.Exception("Для разового договора необходимо указать дату начала и окончания работ (StartDateOfWork и EndDateOfWork)");
            }

            var contract = new ContractEntity
            {
                OrganizationId = organization.Id,
                ContractTypeId = contractType.Id,
                ContractNumber = request.ContractNumber,
                CreationDate = request.CreationDate,
                StartDateOfWork = isYearly ? null : request.StartDateOfWork,
                EndDateOfWork = isYearly ? null : request.EndDateOfWork,
                ExpirationDate = isOneTime ? null : request.ExpirationDate
            };

            var addedContract = await _ctx.Contracts.AddAsync(contract, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);

            await _ctx.Entry(addedContract.Entity)
                .Reference(c => c.Organization)
                .LoadAsync(cancellationToken);
            await _ctx.Entry(addedContract.Entity)
                .Reference(c => c.ContractType)
                .LoadAsync(cancellationToken);

            return new CreateContractResponse
            {
                Id = addedContract.Entity.Id,
                ContractType = addedContract.Entity.ContractType?.Name ?? string.Empty,
                OrganizationName = addedContract.Entity.Organization?.Name ?? string.Empty,
                ContractNumber = addedContract.Entity.ContractNumber,
                CreationDate = addedContract.Entity.CreationDate,
                StartDateOfWork = addedContract.Entity.StartDateOfWork,
                EndDateOfWork = addedContract.Entity.EndDateOfWork,
                ExpirationDate = addedContract.Entity.ExpirationDate
            };
        }
    }
}
