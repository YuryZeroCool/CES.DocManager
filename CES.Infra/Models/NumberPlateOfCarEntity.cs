using CES.Infra.Models.MaterialReport;
using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class NumberPlateOfCarEntity
    {
        public int Id { get; set; }

        public string? Number { get; set; }

        public int GarageNumber { get; set; }

        public int VehicleModelId { get; set; }

        [JsonIgnore]
        public VehicleModelEntity? VehicleModel { get; set; }

        public bool IsActive { get; set; }

        public ICollection<FuelWorkCardEntity>? FuelWorkCards { get; set; }

        [JsonIgnore]
        public ICollection<EmployeeEntity>? Employees { get; set; }

        [JsonIgnore]
        public ICollection<DecommissionedMaterialEntity>? DecommissionedMaterials { get; set; }


        [JsonIgnore]
        public ICollection<DivisionEntity>? Divisions { get; set; }

        public NumberPlateOfCarEntity()
        {
            FuelWorkCards = new List<FuelWorkCardEntity>();
            DecommissionedMaterials = new List<DecommissionedMaterialEntity>();
            Employees = new List<EmployeeEntity>();
            Divisions = new List<DivisionEntity>();
        }
    }
}
