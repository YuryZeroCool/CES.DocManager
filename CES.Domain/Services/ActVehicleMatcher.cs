using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Services
{
    public static class ActVehicleMatcher
    {
        public static string ExtractPlateNumber(string vehicle)
        {
            var normalized = vehicle.Trim();
            var openBracketIndex = normalized.LastIndexOf('(');
            var closeBracketIndex = normalized.LastIndexOf(')');

            if (openBracketIndex >= 0 && closeBracketIndex > openBracketIndex)
            {
                return normalized[(openBracketIndex + 1)..closeBracketIndex].Trim();
            }

            return normalized;
        }

        public static async Task<NumberPlateOfCarEntity?> FindAsync(
            IQueryable<NumberPlateOfCarEntity> query,
            string vehicle,
            NumberPlateOfCarEntity? currentNumberPlate = null,
            CancellationToken cancellationToken = default)
        {
            var normalizedVehicle = vehicle.Trim();
            var plateFromVehicle = ExtractPlateNumber(normalizedVehicle);

            var matchedCar = await query
                .FirstOrDefaultAsync(x => x.Number != null && (
                    normalizedVehicle.Contains(x.Number.Trim(), StringComparison.OrdinalIgnoreCase)
                    || x.Number.Trim().Contains(normalizedVehicle, StringComparison.OrdinalIgnoreCase)
                    || x.Number.Trim().Equals(plateFromVehicle, StringComparison.OrdinalIgnoreCase)
                    || x.Number.Trim().Equals(normalizedVehicle, StringComparison.OrdinalIgnoreCase)
                ), cancellationToken);

            if (matchedCar is not null || currentNumberPlate?.Number is null)
            {
                return matchedCar;
            }

            var currentNumber = currentNumberPlate.Number.Trim();

            if (currentNumber.Equals(normalizedVehicle, StringComparison.OrdinalIgnoreCase)
                || currentNumber.Equals(plateFromVehicle, StringComparison.OrdinalIgnoreCase)
                || normalizedVehicle.Contains(currentNumber, StringComparison.OrdinalIgnoreCase)
                || currentNumber.Contains(normalizedVehicle, StringComparison.OrdinalIgnoreCase))
            {
                return currentNumberPlate;
            }

            return null;
        }
    }
}
