using System;

namespace CES.XmlFormat.Models
{
    public class FuelWorkAccountingCard
    {
        public DateTime Date { get; set; }

        public int NumberList { get; set; }

        public string DriverFullName { get; set; }

        public int HoursWorked { get; set; }

        public int MileageStart { get; set; }

        public int MileageEnd { get; set; }

        public int MileagePerDay { get; set; }

        public int FuelStart { get; set; }

        public int FuelEnd { get; set; }

        public int Refueling { get; set; }

        public int ActualConsumption { get; set; }

        public double ConsumptionAccordingToNorm { get; set; }

        public double Deviation => ConsumptionAccordingToNorm - ActualConsumption;

        public virtual double EngineHoursStart { get; set; }

        public virtual double EngineHoursEnd { get; set; }
    }
}
