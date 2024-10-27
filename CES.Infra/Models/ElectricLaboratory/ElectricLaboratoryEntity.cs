namespace CES.Infra.Models.ElectricLaboratory
{
    public class ElectricLaboratoryEntity
    {
        public int Id { get; set; }

        public EmployeeEntity? EmployeeId { get; set; }

        public DivisionEntity? DivisionId { get; set; }

        public NumberPlateOfCarEntity? NumberPlateCarId { get; set; }

        public int FuelMileage { get; set; }

        public int Consumption { get; set; }
    }
}
