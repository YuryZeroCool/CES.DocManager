using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Mes
{
    public class StreetConfig : IEntityTypeConfiguration<StreetEntity>
    {
        public void Configure(EntityTypeBuilder<StreetEntity> builder)
        {
            builder.HasIndex(x => x.Name).IsUnique(true);
        }
    }
}
