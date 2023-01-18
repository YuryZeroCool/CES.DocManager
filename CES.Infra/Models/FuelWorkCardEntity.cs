using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CES.Infra.Models
{
    public class FuelWorkCardEntity
    {
        public  int Id { get; set; }

        public  DateTime ? WorkDate { get; set; }

        [JsonIgnore]
        public  NumberPlateOfCarEntity? NumberPlateCar { get; set; }

        public byte[]? Data { get; set; }
    }
}
