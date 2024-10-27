using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class FuelWorkCardEntity
    {
        public int Id { get; set; }

        public DateTime? WorkDate { get; set; }

        [JsonIgnore]
        public NumberPlateOfCarEntity? NumberPlateCar { get; set; }

        public byte[]? Data { get; set; }
    }
}
