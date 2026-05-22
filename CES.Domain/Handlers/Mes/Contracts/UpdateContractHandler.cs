using CES.Domain.Models.Request.Mes.Contracts;
using CES.Domain.Models.Response.Mes.Contracts;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Contracts
{
    public class UpdateContractHandler : IRequestHandler<UpdateContractRequest, UpdateContractResponse>
    {
        private readonly DocMangerContext _ctx;

        public UpdateContractHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<UpdateContractResponse> Handle(UpdateContractRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.OrganizationEntities is null
                || _ctx.ContractTypes is null
                || _ctx.Contracts is null)
            {
                throw new System.Exception("Упс! Что-то пошло не так");
            }

            var contract = await _ctx.Contracts
                .Include(c => c.Organization)
                .Include(c => c.ContractType)
                .FirstOrDefaultAsync(c => c.Id == request.ContractId, cancellationToken)
                ?? throw new System.Exception("Договор не найден");

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

            contract.OrganizationId = organization.Id;
            contract.ContractTypeId = contractType.Id;
            contract.ContractNumber = request.ContractNumber.Trim();
            contract.CreationDate = request.CreationDate;
            contract.StartDateOfWork = isYearly ? null : request.StartDateOfWork;
            contract.EndDateOfWork = isYearly ? null : request.EndDateOfWork;
            contract.ExpirationDate = isOneTime ? null : request.ExpirationDate;
            contract.IsPrinted = false;

            await _ctx.SaveChangesAsync(cancellationToken);

            var actsCount = _ctx.Act is null
                ? 0
                : await _ctx.Act.CountAsync(a => a.ContractId == contract.Id, cancellationToken);

            await _ctx.Entry(contract)
                .Reference(c => c.Organization)
                .LoadAsync(cancellationToken);
            await _ctx.Entry(contract)
                .Reference(c => c.ContractType)
                .LoadAsync(cancellationToken);

            return new UpdateContractResponse
            {
                Id = contract.Id,
                ContractType = contract.ContractType?.Name ?? string.Empty,
                OrganizationName = contract.Organization?.Name ?? string.Empty,
                ContractNumber = contract.ContractNumber,
                CreationDate = contract.CreationDate,
                StartDateOfWork = contract.StartDateOfWork,
                EndDateOfWork = contract.EndDateOfWork,
                ExpirationDate = contract.ExpirationDate,
                IsPrinted = contract.IsPrinted,
                HasLinkedAct = actsCount > 0,
                ActsCount = actsCount,
            };
        }
    }
}
