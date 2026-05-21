using CES.Domain.Models.Contracts;
using CES.Domain.Models.Request.Mes.Contracts;
using CES.Domain.Models.Response.Mes.Contracts;
using CES.Domain.Services;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Contracts
{
    public class PrintContractHandler : IRequestHandler<PrintContractRequest, PrintContractResponse>
    {
        private readonly DocMangerContext _ctx;
        private readonly IWebHostEnvironment _environment;
        private readonly ContractDocumentGenerator _generator = new();

        public PrintContractHandler(DocMangerContext ctx, IWebHostEnvironment environment)
        {
            _ctx = ctx;
            _environment = environment;
        }

        public async Task<PrintContractResponse> Handle(PrintContractRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.Contracts is null)
            {
                throw new System.Exception("Упс! Что-то пошло не так");
            }

            var contract = await _ctx.Contracts
                .Include(c => c.Organization)
                .Include(c => c.ContractType)
                .FirstOrDefaultAsync(c => c.Id == request.ContractId, cancellationToken)
                ?? throw new System.Exception("Договор не найден");

            if (contract.IsPrinted)
            {
                throw new System.Exception("Договор уже распечатан");
            }

            var contractTypeName = contract.ContractType?.Name?.Trim() ?? string.Empty;
            var isYearly = contractTypeName == "Годовой";
            var templateFileName = isYearly ? "годовой" + ".doc" : "разовый" + ".doc";
            var templatePath = Path.Combine(_environment.WebRootPath, "Contract", templateFileName);

            if (!File.Exists(templatePath))
            {
                throw new System.Exception($"Шаблон договора не найден: {templateFileName}");
            }

            IReadOnlyList<ActEntity> acts = Array.Empty<ActEntity>();
            if (!isYearly)
            {
                acts = await _ctx.Act!
                    .Include(a => a.NumberPlateOfCar)
                        .ThenInclude(c => c!.VehicleModel)
                    .Include(a => a.Notes!)
                        .ThenInclude(n => n.Street)
                    .Include(a => a.Notes!)
                        .ThenInclude(n => n.HouseNumber)
                    .Include(a => a.Notes!)
                        .ThenInclude(n => n.Entrance)
                    .Where(a => a.ContractId == contract.Id)
                    .OrderBy(a => a.DateOfWorkCompletion)
                    .ToListAsync(cancellationToken);

                if (acts.Count == 0)
                {
                    throw new System.Exception("Для разового договора не найден акт");
                }
            }

            var printData = BuildPrintData(contract, acts, isYearly);
            var fileContent = _generator.Generate(templatePath, printData);

            return new PrintContractResponse
            {
                FileContent = fileContent,
                FileName = printData.FileName,
            };
        }

        private static ContractPrintData BuildPrintData(ContractEntity contract, IReadOnlyList<ActEntity> acts, bool isYearly)
        {
            var organizationName = contract.Organization?.Name?.Trim() ?? string.Empty;
            var contractType = contract.ContractType?.Name?.Trim() ?? string.Empty;

            var data = new ContractPrintData
            {
                ContractNumber = contract.ContractNumber.Trim(),
                ContractType = contractType,
                IsYearly = isYearly,
                CreationDateMonthYear = ContractDocumentGenerator.FormatContractHeaderDate(contract.CreationDate),
                OrganizationName = organizationName,
                FileName = ContractDocumentGenerator.BuildFileName(
                    contract.ContractNumber.Trim(),
                    organizationName,
                    contractType),
            };

            if (isYearly)
            {
                data.ContractValidityPeriod = contract.ExpirationDate.HasValue
                    ? $"{ContractDocumentGenerator.FormatDate(contract.CreationDate)} до {ContractDocumentGenerator.FormatDate(contract.ExpirationDate)}"
                    : string.Empty;
            }
            else
            {
                data.WorkStartDate = ContractDocumentGenerator.FormatDate(contract.StartDateOfWork);
                data.WorkEndDate = ContractDocumentGenerator.FormatDate(contract.EndDateOfWork);

                if (acts.Count > 0)
                {
                    var aggregated = ContractActPrintAggregation.AggregateForOneTimeContract(acts);
                    data.ActTypeNames = aggregated.ActTypeNames;
                    data.WorkStartDate = ContractDocumentGenerator.FormatDate(
                        contract.StartDateOfWork ?? aggregated.WorkStartDate);
                    data.WorkEndDate = ContractDocumentGenerator.FormatDate(
                        contract.EndDateOfWork ?? aggregated.WorkEndDate);
                    data.WorkAddress = aggregated.WorkAddress;
                    data.TotalAmountClause = RussianMoneyFormatter.FormatAmountClause(
                        aggregated.Total,
                        aggregated.Vat);
                }
            }

            return data;
        }
    }
}
