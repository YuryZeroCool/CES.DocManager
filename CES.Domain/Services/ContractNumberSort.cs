using System.Text.RegularExpressions;

namespace CES.Domain.Services
{
	public static class ContractNumberSort
	{
		private static readonly Regex NumberPrefixRegex = new(@"^(\d+)", RegexOptions.Compiled);

		public static int GetNumericPart(string contractNumber)
		{
			var trimmed = contractNumber.Trim();
			var match = NumberPrefixRegex.Match(trimmed);
			return match.Success && int.TryParse(match.Groups[1].Value, out var number)
				? number
				: int.MaxValue;
		}

		public static IOrderedEnumerable<T> OrderByContractNumber<T>(
			IEnumerable<T> source,
			Func<T, string> contractNumberSelector)
		{
			return source
				.OrderBy(item => GetNumericPart(contractNumberSelector(item)))
				.ThenBy(item => contractNumberSelector(item), StringComparer.OrdinalIgnoreCase);
		}
	}
}
