using System.Globalization;

namespace CES.Domain.Services
{
    public class DateTimeConverter
    {
        public static DateTime ConvertToDateTime(string inputDate, string targetFormat)
        {
            string[] formats = {
            "yyyy.MM.dd HH:mm:ss",
            "dd.MM.yyyy HH:mm:ss",
            "MM/dd/yyyy HH:mm:ss",
            "dd/MM/yyyy HH:mm:ss",
            "yyyy-MM-ddTHH:mm:ss",
            "yyyy-MM-dd HH:mm:ss",
            "dd-MM-yyyy HH:mm:ss",
            "MM-dd-yyyy HH:mm:ss",
            "dd.MM.yyyy",
            "yyyy.MM.dd",
            "MM/dd/yyyy",
            "dd/MM/yyyy",
            "yyyy-MM-dd",
            "dd-MM-yyyy",
            "MM-dd-yyyy"
        };

            DateTime parsedDate;

            // Попытка распарсить дату с учетом форматов
            bool success = DateTime.TryParseExact(inputDate, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate);

            if (success)
            {
                // Попытка вернуть дату, отформатированную в targetFormat, но в виде DateTime
                string formattedDate = parsedDate.ToString(targetFormat);
                DateTime resultDate;
                if (DateTime.TryParseExact(formattedDate, targetFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out resultDate))
                {
                    return resultDate;
                }
                else
                {
                    throw new FormatException("Failed to format the date to the target format.");
                }
            }
            else
            {
                throw new FormatException("The provided date string does not match any of the expected formats.");
            }
        }
    }
}