using CES.Infra.Models.MaterialReport;
using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class NumberPlateCarEntity
    {
        public int Id { get; set; }

        public string? Number { get; set; }

        public int GarageNumber { get; set; }

        [JsonIgnore]
        public VehicleModelEntity? VehicleModel { get; set; }

        public int DivisionNumberId { get; set; }

        [JsonIgnore]
        public DivisionEntity DivisionNumber { get; set; }

        public ICollection<FuelWorkCardEntity> FuelWorkCards { get; set; }

        [JsonIgnore]
        public ICollection<DecommissionedMaterialEntity>? DecommissionedMaterials { get; set; }

        public NumberPlateCarEntity()
        {
            DecommissionedMaterials = new List<DecommissionedMaterialEntity>();
        }
    }
}
