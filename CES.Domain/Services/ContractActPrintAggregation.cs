using CES.Infra.Models.Mes;

namespace CES.Domain.Services
{
    public static class ContractActPrintAggregation
    {
        public static IEnumerable<string> GetWorkTypesFromAct(ActEntity act) =>
            VehicleModelWorkTypesParser.Parse(act.NumberPlateOfCar?.VehicleModel?.Name);

        public static string? BuildWorkAddress(ActEntity act)
        {
            var note = act.Notes?.FirstOrDefault();
            if (note is null)
            {
                return null;
            }

            var parts = new List<string>();
            if (note.Street?.Name is not null)
            {
                parts.Add($"ул. {note.Street.Name}");
            }

            if (note.HouseNumber?.Number is not null)
            {
                parts.Add($"д. {note.HouseNumber.Number}");
            }

            return parts.Count > 0 ? string.Join(", ", parts) : null;
        }

        public static AggregatedActsPrintData AggregateForOneTimeContract(IReadOnlyList<ActEntity> acts)
        {
            if (acts.Count == 0)
            {
                throw new System.Exception("Для разового договора не найден акт");
            }

            NoteWorkAddressComparer.EnsureActsShareSameWorkAddressForPrint(acts);

            var total = acts.Sum(a => a.Total);
            var vatSum = acts.Sum(a => a.Vat ?? 0);

            var actTypeNames = new List<string>();
            var seenTypes = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            foreach (var act in acts.OrderBy(a => a.DateOfWorkCompletion))
            {
                foreach (var workType in GetWorkTypesFromAct(act))
                {
                    if (seenTypes.Add(workType))
                    {
                        actTypeNames.Add(workType);
                    }
                }
            }

            var workAddress = acts
                .Select(BuildWorkAddress)
                .FirstOrDefault(address => !string.IsNullOrWhiteSpace(address));

            return new AggregatedActsPrintData
            {
                Total = total,
                Vat = vatSum > 0 ? vatSum : null,
                ActTypeNames = actTypeNames,
                WorkAddress = workAddress,
                WorkStartDate = acts.Min(a => a.DateOfWorkCompletion),
                WorkEndDate = acts.Max(a => a.DateOfWorkCompletion),
            };
        }
    }

    public class AggregatedActsPrintData
    {
        public decimal Total { get; set; }

        public decimal? Vat { get; set; }

        public IReadOnlyList<string> ActTypeNames { get; set; } = Array.Empty<string>();

        public string? WorkAddress { get; set; }

        public DateTime WorkStartDate { get; set; }

        public DateTime WorkEndDate { get; set; }
    }
}
