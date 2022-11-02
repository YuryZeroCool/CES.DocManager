using CES.Infra.Models.MaterialReport;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.MaterialReport
{
    public class UsedMaterialConf : IEntityTypeConfiguration<UsedMaterialEntity>
    {
        public void Configure(EntityTypeBuilder<UsedMaterialEntity> builder)
        {
            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Period)
              .HasColumnType("DATE");
        }
    }
}
