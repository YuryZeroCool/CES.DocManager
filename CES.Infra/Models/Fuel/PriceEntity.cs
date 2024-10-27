using System.Text.Json.Serialization;

namespace CES.Infra.Models.Fuel
{
    public class PriceEntity
    {
        public int Id { get; set; }

        public double Price { get; set; }

        public DateTime Period { get; set; }

        public int FuelId { get; set; }

        [JsonIgnore]
        public FuelEntity? FuelEntity { get; set; }
    }
}
