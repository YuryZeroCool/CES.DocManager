using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CES.Infra.Models.MaterialReport
{
    public class UsedMaterialEntity
    {
        public int Id { get; set; }

        public DateTime Period { get; set; }

        public byte[]? Materials { get; set; }
    }
}
