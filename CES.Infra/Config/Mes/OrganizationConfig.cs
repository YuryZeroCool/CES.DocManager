using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Mes
{
    public class OrganizationConfig : IEntityTypeConfiguration<OrganizationEntity>
    {
        public void Configure(EntityTypeBuilder<OrganizationEntity> builder)
        {

            builder.HasIndex(p => p.Name)
                .IsUnique(true);
        }
    }
}
