using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class VehicleModelEntity
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int VehicleBrandId { get; set; }

        [JsonIgnore]
        public VehicleBrandEntity? VehicleBrand { get; set; }

        [JsonIgnore]
        public ICollection<NumberPlateOfCarEntity> NumberPlateCar { get; set; }

        public VehicleModelEntity()
        {
            NumberPlateCar = new List<NumberPlateOfCarEntity>();
        }
    }
}
