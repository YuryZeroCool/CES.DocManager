using CES.Infra.Models.MaterialReport;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.MaterialReport
{
    public class EnshrinedMaterialConfig : IEntityTypeConfiguration<EnshrinedMaterialEntity>
    {
        public void Configure(EntityTypeBuilder<EnshrinedMaterialEntity> builder)
        {
            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(e => e.NameMaterial)
              .HasMaxLength(200);

            builder.Property(e => e.NameParty)
            .HasMaxLength(100);

            builder.Property(x => x.Price).HasPrecision(12, 2);

            builder.Property(p => p.PartyDate)

                .HasColumnType("smalldatetime");

            builder.Property(p => p.DateCreated)

                .HasColumnType("smalldatetime");
        }
    }
}
