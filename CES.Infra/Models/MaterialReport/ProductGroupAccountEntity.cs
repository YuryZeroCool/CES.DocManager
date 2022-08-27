using System.Text.Json.Serialization;

namespace CES.Infra.Models.MaterialReport
{
    public class ProductGroupAccountEntity
    {
        public int Id { get; set; }

        public string? AccountName { get; set; }

        [JsonIgnore]
        public ICollection<ProductEntity> Products { get; set; }

        public ProductGroupAccountEntity()
        {
            Products = new List<ProductEntity>();
        }
    }
}
