namespace CES.Domain.Models
{
    public class FuelWorkCardModel
    {
        public DateTime Date { get; set; } //Дата

        public int NumberList { get; set; } //Номер путевого листа

        public string? DriverFullName { get; set; } // Фамилия

        public int HoursWorked { get; set; } // Часы отработаные 

        public int MileageStart { get; set; } // Показание спидометра  на начало

        public int MileageEnd { get; set; } // Показание на конец дня

        public int MileagePerDay { get; set; } //Пробег за день

        public int FuelStart { get; set; } // Топливо нам начало 

        public int FuelEnd { get; set; } // Топливо наконец рабочегог дня 

        public double Refueling { get; set; } // Заправка

        public double ActualConsumption { get; set; } // Фактическое потребление топлива

        public double ConsumptionAccordingToNorm { get; set; } //Потребление топлива по норме 

        public virtual double EngineHoursStart { get; set; }  //Старт часов работы двигателя

        public virtual double EngineHoursEnd { get; set; } // Окончание работы двигателя

    }
}
