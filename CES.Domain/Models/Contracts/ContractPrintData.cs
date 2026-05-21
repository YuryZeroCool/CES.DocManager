namespace CES.Domain.Models.Contracts
{
    public class ContractPrintData
    {
        public string ContractNumber { get; set; } = string.Empty;

        public string ContractType { get; set; } = string.Empty;

        public bool IsYearly { get; set; }

        public string CreationDateMonthYear { get; set; } = string.Empty;

        public string OrganizationName { get; set; } = string.Empty;

        public string? WorkAddress { get; set; }

        public IReadOnlyList<string> ActTypeNames { get; set; } = Array.Empty<string>();

        public string? WorkStartDate { get; set; }

        public string? WorkEndDate { get; set; }

        public string? TotalAmountClause { get; set; }

        public string? ContractValidityPeriod { get; set; }

        public string FileName { get; set; } = string.Empty;
    }
}
