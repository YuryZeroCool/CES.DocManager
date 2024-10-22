namespace CES.Domain.Services
{
    public class Date
    {
        public DateTime SplitDate(string date)
        {
            var datesArr = date.Split("-");

            var resYear = int.TryParse(datesArr[0], out var year);
            var resMont = int.TryParse(datesArr[1], out var month);
            var resDay = int.TryParse(datesArr[2], out var day);

            if (resYear && resMont && resDay)
            {
                return new DateTime(year, month, day);
            }
            else throw new System.Exception("Упс! Что-то пошло не так");
        }

        public int GetYear(string date)
        {
            var datesArr = date.Split("-");
            var resYear = int.TryParse(datesArr[0], out var year);

            if (resYear)
            {
                return year;
            }
            else throw new System.Exception("Error ");
        }

        public int GetMonth(string date)
        {
            var datesArr = date.Split("-");
            var resMonth = int.TryParse(datesArr[1], out var month);

            if (resMonth)
            {
                return month;
            }
            else throw new System.Exception("Error ");
        }
    }
}
