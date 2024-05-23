namespace CES.Infra.Models.Mes
{
    public class OrganizationTypeEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public ICollection<OrganizationEntity>? Organizations { get; set; } = new List<OrganizationEntity>();
    }
}
