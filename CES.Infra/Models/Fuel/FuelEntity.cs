using System.Text.Json.Serialization;

namespace CES.Infra.Models.Fuel
{
    public class FuelEntity
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        [JsonIgnore]
        public ICollection<PriceEntity> PriceEntities { get; set; }
        public FuelEntity()
        {
            PriceEntities = new List<PriceEntity>();
        }
    }
}
