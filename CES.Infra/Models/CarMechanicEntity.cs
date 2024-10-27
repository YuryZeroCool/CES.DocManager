using CES.Infra.Models.MaterialReport;
using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class CarMechanicEntity
    {
        public int Id { get; set; }

        public string? FIO { get; set; }

        public bool IsActive { get; set; }

        [JsonIgnore]
        public ICollection<DecommissionedMaterialEntity>? DecommissionedMaterials { get; set; }

        public CarMechanicEntity()
        {
            DecommissionedMaterials = new List<DecommissionedMaterialEntity>();
        }
    }
}

