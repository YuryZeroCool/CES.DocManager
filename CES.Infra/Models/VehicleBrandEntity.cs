using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class VehicleBrandEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<VehicleModelEntity> VehiclesModels { get; set; }

        public VehicleBrandEntity()
        {
            VehiclesModels = new List<VehicleModelEntity>();
        }
    }
}
