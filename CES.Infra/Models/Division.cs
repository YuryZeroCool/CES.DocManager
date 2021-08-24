using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

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
