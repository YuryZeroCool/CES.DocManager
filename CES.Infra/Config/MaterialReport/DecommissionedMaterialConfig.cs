using CES.Infra.Models.MaterialReport;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.MaterialReport
{
    public class DecommissionedMaterialConfig : IEntityTypeConfiguration<DecommissionedMaterialEntity>
    {
        public void Configure(EntityTypeBuilder<DecommissionedMaterialEntity> builder)
        {
            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.CurrentDate)
              .HasColumnType("DATE");
        }
    }
}
