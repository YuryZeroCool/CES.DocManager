using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CES.Infra.Models
{
    public class EmployeeEntity
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int PersonnelNumber { get; set; }

        public DateTime BthDate { get; set; }
         public int DivisionNumberId { get; set; }
        [JsonIgnore]
        public Division DivisionNumber { get; set; }
       

        public ICollection<DriverLicenseEntity> DriverLicense { get; set; }


        public EmployeeEntity()
        {
            DriverLicense = new List<DriverLicenseEntity>();
        }
    }
}
