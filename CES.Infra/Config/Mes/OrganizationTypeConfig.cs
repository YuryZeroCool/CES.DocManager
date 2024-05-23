using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Mes
{
    public class OrganizationTypeConfig : IEntityTypeConfiguration<OrganizationTypeEntity>
    {
        public void Configure(EntityTypeBuilder<OrganizationTypeEntity> builder)
        {
            builder.HasIndex(p => p.Name)
              .IsUnique(true);
        }
    }
}
