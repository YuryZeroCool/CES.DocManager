using System.IO;

namespace CES.Infra.Models.MaterialReport
{
    public class ProductEntity
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int UnitId { get; set; }

        public UnitEntity? Unit { get; set; }

        public ICollection<PartyEntity>? Parties { get; set; }

        public int ProductGroupAccountId { get; set; }

        public ProductGroupAccountEntity? Account { get; set; }
    }
}
