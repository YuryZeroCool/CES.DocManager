using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;

namespace CES.Infra.Config.Mes
{
    public class ActTypeConfig : IEntityTypeConfiguration<ActTypeEntity>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<ActTypeEntity> builder)
        {
            builder.HasIndex(p => p.Name)
                 .IsUnique(true);
        }
    }
}
