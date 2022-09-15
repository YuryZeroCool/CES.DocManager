using System.ComponentModel;

namespace CES.Infra.Models
{
    public class WorkCardDivisionsEntity
    {
        public int Id { get; set; }

        public string?  Division { get; set; }

        public DateTime PeriodReport { get; set; }

        public byte[]? Date { get; set; }    
     }
}
