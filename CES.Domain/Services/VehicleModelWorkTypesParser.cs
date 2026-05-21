namespace CES.Domain.Services
{
    public static class VehicleModelWorkTypesParser
    {
        public static IReadOnlyList<string> Parse(string? vehicleModelName)
        {
            if (string.IsNullOrWhiteSpace(vehicleModelName))
            {
                return Array.Empty<string>();
            }

            var parts = vehicleModelName
                .Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            if (parts.Length == 1)
            {
                return new[] { parts[0] };
            }

            return parts.Skip(1).ToList();
        }
    }
}
