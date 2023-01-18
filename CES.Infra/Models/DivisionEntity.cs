using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class DivisionEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<EmployeeEntity> EmployeeEntities { get; set; }


        [JsonIgnore]
        public ICollection<NumberPlateOfCarEntity>? NumberPlateOfCars { get; set; }

        public DivisionEntity()
        {
            EmployeeEntities = new List<EmployeeEntity>();
            NumberPlateOfCars = new List<NumberPlateOfCarEntity>();
        }
    }
}
