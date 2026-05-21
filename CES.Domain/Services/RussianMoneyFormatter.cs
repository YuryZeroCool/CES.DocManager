using System.Globalization;
using System.Text;

namespace CES.Domain.Services
{
    public static class RussianMoneyFormatter
    {
        private static readonly CultureInfo RuCulture = CultureInfo.GetCultureInfo("ru-RU");

        private static readonly string[] Hundreds =
        {
            "", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот",
        };

        private static readonly string[] Tens =
        {
            "", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто",
        };

        private static readonly string[] Teens =
        {
            "десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать",
            "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать",
        };

        private static readonly string[] UnitsMale =
        {
            "", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
        };

        private static readonly string[] UnitsFemale =
        {
            "", "одна", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
        };

        private static readonly string[][] ThousandsForms =
        {
            new[] { "тысяча", "тысячи", "тысяч" },
            new[] { "миллион", "миллиона", "миллионов" },
        };

        public static string FormatAmountClause(decimal total, decimal? vat)
        {
            var totalPart = FormatMoneyPart(total);

            if (vat is null or <= 0)
            {
                return $"{totalPart}.";
            }

            return $"{totalPart}, в т.ч. НДС 20% {FormatMoneyPart(vat.Value)}.";
        }

        private static string FormatMoneyPart(decimal amount) =>
            $"{amount.ToString("0.00", CultureInfo.InvariantCulture)} руб. ({ToMoneyWords(amount)})";

        public static string ToMoneyWords(decimal amount)
        {
            var rubles = (long)Math.Floor(amount);
            var kopecks = (int)Math.Round((amount - rubles) * 100, MidpointRounding.AwayFromZero);

            if (kopecks == 100)
            {
                rubles += 1;
                kopecks = 0;
            }

            var rublesWords = NumberToWords(rubles, false);
            var rubWord = GetRublesWord(rubles);
            var kopWords = NumberToWords(kopecks, true);
            var kopWord = GetKopecksWord(kopecks);

            return $"{CapitalizeFirst(rublesWords)} {rubWord} {kopWords} {kopWord}".Trim();
        }

        private static string NumberToWords(long number, bool feminine)
        {
            if (number == 0)
            {
                return "ноль";
            }

            var builder = new StringBuilder();
            var groupIndex = 0;

            while (number > 0)
            {
                var chunk = (int)(number % 1000);
                if (chunk > 0)
                {
                    var chunkWords = ThreeDigitsToWords(chunk, groupIndex == 1 || feminine && groupIndex == 0);
                    var groupName = groupIndex > 0 ? GetGroupWord(chunk, ThousandsForms[groupIndex - 1]) : string.Empty;
                    builder.Insert(0, $"{chunkWords} {groupName} ".Trim() + " ");
                }

                number /= 1000;
                groupIndex++;
            }

            return builder.ToString().Trim();
        }

        private static string ThreeDigitsToWords(int number, bool feminine)
        {
            var hundreds = number / 100;
            var tensUnits = number % 100;
            var tens = tensUnits / 10;
            var units = tensUnits % 10;

            var parts = new List<string>();
            if (hundreds > 0)
            {
                parts.Add(Hundreds[hundreds]);
            }

            if (tensUnits is >= 10 and <= 19)
            {
                parts.Add(Teens[tensUnits - 10]);
            }
            else
            {
                if (tens > 0)
                {
                    parts.Add(Tens[tens]);
                }

                if (units > 0)
                {
                    parts.Add((feminine ? UnitsFemale : UnitsMale)[units]);
                }
            }

            return string.Join(' ', parts);
        }

        private static string GetGroupWord(int number, string[] forms)
        {
            var tensUnits = number % 100;
            var units = number % 10;

            if (tensUnits is >= 11 and <= 19)
            {
                return forms[2];
            }

            return units switch
            {
                1 => forms[0],
                2 or 3 or 4 => forms[1],
                _ => forms[2],
            };
        }

        private static string GetRublesWord(long number)
        {
            var tensUnits = number % 100;
            var units = number % 10;

            if (tensUnits is >= 11 and <= 19)
            {
                return "рублей";
            }

            return units switch
            {
                1 => "рубль",
                2 or 3 or 4 => "рубля",
                _ => "рублей",
            };
        }

        private static string GetKopecksWord(int number)
        {
            var tensUnits = number % 100;
            var units = number % 10;

            if (tensUnits is >= 11 and <= 19)
            {
                return "копеек";
            }

            return units switch
            {
                1 => "копейка",
                2 or 3 or 4 => "копейки",
                _ => "копеек",
            };
        }

        private static string CapitalizeFirst(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return text;
            }

            return char.ToUpper(text[0], RuCulture) + text[1..];
        }
    }
}
