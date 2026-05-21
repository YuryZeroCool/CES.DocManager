using System.Drawing;
using System.Globalization;
using System.Text;
using CES.Domain.Models.Contracts;
using Spire.Doc;
using Spire.Doc.Documents;
using Spire.Doc.Fields;

namespace CES.Domain.Services
{
    public class ContractDocumentGenerator
    {
        private static readonly CultureInfo RuCulture = CultureInfo.GetCultureInfo("ru-RU");

        public byte[] Generate(string templatePath, ContractPrintData data)
        {
            using var document = new Document();
            document.LoadFromFile(templatePath);

            ApplyTextReplacements(document, data);

            ApplyTemplateRedReplacements(document, data);

            using var stream = new MemoryStream();
            document.SaveToStream(stream, FileFormat.Doc);
            return stream.ToArray();
        }

        public static string BuildFileName(string contractNumber, string organizationName, string contractType)
        {
            var number = contractNumber.Trim().Replace('/', '-');
            var organization = SanitizeFileNamePart(organizationName);
            var type = SanitizeFileNamePart(contractType).ToLower(RuCulture);

            return $"{number} {organization} - {type}.doc".Replace("_", string.Empty, StringComparison.Ordinal);
        }

        private static string SanitizeFileNamePart(string part)
        {
            var invalidChars = new HashSet<char>(Path.GetInvalidFileNameChars());
            return string.Concat(part.Trim().Where(ch => !invalidChars.Contains(ch)));
        }

        public static string FormatMonthYear(DateTime date) =>
            $"{RuCulture.DateTimeFormat.GetMonthName(date.Month)} {date.Year} г";

        public static string FormatContractHeaderDate(DateTime date)
        {
            var day = date.ToString("dd", RuCulture);
            var month = RuCulture.DateTimeFormat.MonthGenitiveNames[date.Month - 1];
            if (!string.IsNullOrEmpty(month))
            {
                month = char.ToUpper(month[0], RuCulture) + month[1..];
            }

            return $"«{day}» {month} {date.Year} г.";
        }

        public static string FormatDate(DateTime? date) =>
            date.HasValue ? date.Value.ToString("dd.MM.yyyy", RuCulture) + "г." : string.Empty;

        private static void ApplyTextReplacements(Document document, ContractPrintData data)
        {
            if (!string.IsNullOrWhiteSpace(data.OrganizationName))
            {
                document.Replace(" , в лице", $" {data.OrganizationName}, в лице", true, true);
            }

            if (!data.IsYearly && !string.IsNullOrWhiteSpace(data.ContractValidityPeriod))
            {
                document.Replace("с 10.02.2026г. до 31.12.2026г.", data.ContractValidityPeriod, true, true);
            }
        }

        private static void ApplyTemplateRedReplacements(Document document, ContractPrintData data)
        {
            foreach (Section section in document.Sections)
            {
                ProcessTemplateBody(section.Body, data);
            }
        }

        private static void ProcessTemplateBody(Body body, ContractPrintData data)
        {
            foreach (DocumentObject child in body.ChildObjects)
            {
                switch (child)
                {
                    case Paragraph paragraph:
                        ApplyTemplateParagraph(paragraph, data);
                        break;
                    case Table table:
                        foreach (TableRow row in table.Rows)
                        {
                            foreach (TableCell cell in row.Cells)
                            {
                                ProcessTemplateBody(cell, data);
                            }
                        }
                        break;
                }
            }
        }

        private static void ApplyTemplateParagraph(Paragraph paragraph, ContractPrintData data)
        {
            var text = GetParagraphText(paragraph);

            if (text.Contains("Договор", StringComparison.Ordinal) && text.Contains("№", StringComparison.Ordinal))
            {
                ReplaceParagraphRedTexts(paragraph, $"№ {data.ContractNumber}");
                return;
            }

            if (text.Contains("г. Минск", StringComparison.Ordinal)
                && (text.Contains('«', StringComparison.Ordinal) || text.Contains("202", StringComparison.Ordinal)))
            {
                ReplaceContractDateParagraphRedTexts(paragraph, data.CreationDateMonthYear);
                return;
            }

            if (data.IsYearly)
            {
                if (text.Contains("Срок действия настоящего договора", StringComparison.Ordinal)
                    && !string.IsNullOrWhiteSpace(data.ContractValidityPeriod))
                {
                    ReplaceParagraphRedTexts(paragraph, data.ContractValidityPeriod);
                }

                return;
            }

            if (text.Contains("Начало работ", StringComparison.Ordinal)
                && !string.IsNullOrWhiteSpace(data.WorkStartDate))
            {
                ReplaceWorkDateParagraphRedTexts(paragraph, data.WorkStartDate);
                return;
            }

            if (text.Contains("Окончание работ", StringComparison.Ordinal)
                && !string.IsNullOrWhiteSpace(data.WorkEndDate))
            {
                ReplaceWorkDateParagraphRedTexts(paragraph, data.WorkEndDate);
                return;
            }

            if (text.Contains("машинами", StringComparison.OrdinalIgnoreCase)
                && data.ActTypeNames.Count > 0)
            {
                ReplaceMachineTypeParagraphRedTexts(paragraph, data.ActTypeNames);
            }

            if (text.Contains("Заказчик обязуется принять", StringComparison.Ordinal)
                && !string.IsNullOrWhiteSpace(data.WorkAddress))
            {
                ReplaceParagraphRedTexts(paragraph, FormatWorkAddressForContract(data.WorkAddress));
                return;
            }

            if (text.Contains("машинами", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            if (text.Contains("Стоимость выполненных работ", StringComparison.Ordinal)
                && !string.IsNullOrWhiteSpace(data.TotalAmountClause))
            {
                ReplaceAmountParagraphRedTexts(paragraph, data.TotalAmountClause);
            }
        }

        private static string GetParagraphText(Paragraph paragraph)
        {
            var builder = new StringBuilder();
            foreach (DocumentObject child in paragraph.ChildObjects)
            {
                if (child is TextRange textRange)
                {
                    builder.Append(textRange.Text);
                }
            }

            return builder.ToString();
        }

        private static List<TextRange> GetRedTextRanges(Paragraph paragraph)
        {
            var result = new List<TextRange>();
            CollectRedTextRanges(paragraph, result);
            return result;
        }

        private static void CollectRedTextRanges(DocumentObject documentObject, ICollection<TextRange> result)
        {
            switch (documentObject)
            {
                case Paragraph paragraph:
                    foreach (DocumentObject child in paragraph.ChildObjects)
                    {
                        CollectRedTextRanges(child, result);
                    }
                    break;
                case TextRange textRange when IsRed(textRange):
                    result.Add(textRange);
                    break;
            }
        }

        private static void ReplaceParagraphRedTexts(Paragraph paragraph, string value)
        {
            var redRanges = GetRedTextRanges(paragraph);
            if (redRanges.Count == 0)
            {
                return;
            }

            redRanges[0].Text = value;
            redRanges[0].CharacterFormat.TextColor = Color.Black;

            for (var i = 1; i < redRanges.Count; i++)
            {
                redRanges[i].Text = string.Empty;
            }
        }

        private static void ReplaceContractDateParagraphRedTexts(Paragraph paragraph, string dateValue)
        {
            var redRanges = GetRedTextRanges(paragraph);
            var dateAssigned = false;

            foreach (var textRange in redRanges)
            {
                if (IsContractDateSpacingFragment(textRange.Text))
                {
                    textRange.CharacterFormat.TextColor = Color.Black;
                    continue;
                }

                if (IsContractDateFragment(textRange.Text))
                {
                    if (!dateAssigned)
                    {
                        textRange.Text = dateValue;
                        textRange.CharacterFormat.TextColor = Color.Black;
                        dateAssigned = true;
                    }
                    else
                    {
                        textRange.Text = string.Empty;
                    }
                }
                else
                {
                    textRange.Text = string.Empty;
                }
            }
        }

        private static bool IsContractDateSpacingFragment(string text) =>
            text.Contains('\t', StringComparison.Ordinal)
            || (text.Length > 0 && text.Trim().Length == 0);

        private static void ReplaceAmountParagraphRedTexts(Paragraph paragraph, string amountClause)
        {
            var redRanges = GetRedTextRanges(paragraph);
            if (redRanges.Count == 0)
            {
                return;
            }

            redRanges[0].Text = amountClause;
            redRanges[0].CharacterFormat.TextColor = Color.Black;

            for (var i = 1; i < redRanges.Count; i++)
            {
                redRanges[i].Text = string.Empty;
                redRanges[i].CharacterFormat.TextColor = Color.Black;
            }
        }

        public static string FormatWorkAddressForContract(string workAddress)
        {
            var address = workAddress.Trim();
            if (!address.StartsWith("г.", StringComparison.OrdinalIgnoreCase))
            {
                address = $"г.Минск, {address}";
            }

            return $"{address}, ";
        }

        private static void ReplaceMachineTypeParagraphRedTexts(Paragraph paragraph, IReadOnlyList<string> actTypeNames)
        {
            var redRanges = GetRedTextRanges(paragraph);
            var machineFragments = redRanges
                .Where(textRange => IsMachineTypeFragment(textRange.Text))
                .ToList();

            if (machineFragments.Count == 0)
            {
                return;
            }

            var workTypesText = string.Join(", ", actTypeNames);
            machineFragments[0].Text = workTypesText;
            machineFragments[0].CharacterFormat.TextColor = Color.Black;

            for (var i = 1; i < machineFragments.Count; i++)
            {
                machineFragments[i].Text = string.Empty;
                machineFragments[i].CharacterFormat.TextColor = Color.Black;
            }
        }

        private static void ReplaceWorkDateParagraphRedTexts(Paragraph paragraph, string dateValue)
        {
            var redRanges = GetRedTextRanges(paragraph);
            var dateAssigned = false;

            foreach (var textRange in redRanges)
            {
                if (IsWorkDateFragment(textRange.Text))
                {
                    if (!dateAssigned)
                    {
                        textRange.Text = dateValue;
                        textRange.CharacterFormat.TextColor = Color.Black;
                        dateAssigned = true;
                    }
                    else
                    {
                        textRange.Text = string.Empty;
                    }
                }
                else
                {
                    textRange.CharacterFormat.TextColor = Color.Black;
                }
            }
        }

        private static bool IsMachineTypeFragment(string text)
        {
            var trimmed = text.Trim();
            if (string.IsNullOrEmpty(trimmed))
            {
                return false;
            }

            return trimmed.Contains('К', StringComparison.OrdinalIgnoreCase)
                || trimmed.Contains('О', StringComparison.OrdinalIgnoreCase)
                || trimmed.Contains('-', StringComparison.Ordinal)
                || trimmed.Contains("514", StringComparison.Ordinal)
                || trimmed.Contains("524", StringComparison.Ordinal)
                || trimmed.Contains("564", StringComparison.Ordinal)
                || trimmed.Contains("теле", StringComparison.OrdinalIgnoreCase);
        }

        private static bool IsWorkDateFragment(string text)
        {
            var trimmed = text.Trim();
            if (trimmed is ":" or "работ")
            {
                return false;
            }

            return trimmed.Contains('.', StringComparison.Ordinal)
                || trimmed.Any(char.IsDigit)
                || trimmed is "г" or "г.";
        }

        private static bool IsContractDateFragment(string text)
        {
            var trimmed = text.Trim();
            return text.Contains('«', StringComparison.Ordinal)
                || text.Contains('»', StringComparison.Ordinal)
                || text.Contains("202", StringComparison.Ordinal)
                || text.Contains("Мая", StringComparison.OrdinalIgnoreCase)
                || text.Contains("Апрел", StringComparison.OrdinalIgnoreCase)
                || text.Contains("январ", StringComparison.OrdinalIgnoreCase)
                || text.Contains("феврал", StringComparison.OrdinalIgnoreCase)
                || text.Contains("март", StringComparison.OrdinalIgnoreCase)
                || text.Contains("июн", StringComparison.OrdinalIgnoreCase)
                || text.Contains("июл", StringComparison.OrdinalIgnoreCase)
                || text.Contains("август", StringComparison.OrdinalIgnoreCase)
                || text.Contains("сентябр", StringComparison.OrdinalIgnoreCase)
                || text.Contains("октябр", StringComparison.OrdinalIgnoreCase)
                || text.Contains("ноябр", StringComparison.OrdinalIgnoreCase)
                || text.Contains("декабр", StringComparison.OrdinalIgnoreCase)
                || trimmed == "г"
                || trimmed.All(char.IsDigit);
        }

        private static bool IsRed(TextRange textRange)
        {
            var color = textRange.CharacterFormat.TextColor;
            return color.R == 255 && color.G == 0 && color.B == 0;
        }
    }
}
