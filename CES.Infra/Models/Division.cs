using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class Division
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<EmployeeEntity> EmployeeEntities { get; set; }

        public Division()
        {
            EmployeeEntities = new List<EmployeeEntity>();      
        }
    }
}
