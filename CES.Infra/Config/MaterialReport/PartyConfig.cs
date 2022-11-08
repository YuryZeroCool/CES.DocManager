using CES.Infra.Models.MaterialReport;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.MaterialReport
{
    public class PartyConfig : IEntityTypeConfiguration<PartyEntity>
    {
        public void Configure(EntityTypeBuilder<PartyEntity> builder)
        {
            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Price).HasPrecision(12, 2);
            builder.Property(x=>x.TotalSum).HasPrecision(12, 2);
            builder.Property(p => p.PartyDate)
                .HasColumnType("smalldatetime");
            builder.Property(p => p.DateCreated)
                .HasColumnType("smalldatetime");
        }
    }
}
