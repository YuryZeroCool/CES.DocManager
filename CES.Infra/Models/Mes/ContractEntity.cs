using System.Text.Json.Serialization;

namespace CES.Infra.Models.Mes
{
    public class ContractEntity
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime? StartDateOfWork { get; set; }

        public DateTime? EndDateOfWork { get; set; }

        public DateTime? ExpirationDate { get; set; }

        public string ContractNumber { get; set; } = string.Empty;

        public int? OrganizationId { get; set; }

        [JsonIgnore]
        public OrganizationEntity? Organization { get; set; }

        public ICollection<ActEntity>? Acts { get; set; } = new List<ActEntity>();

        public int ContractTypeId { get; set; }

        public ContractTypeEntity? ContractType { get; set; }
    }
}