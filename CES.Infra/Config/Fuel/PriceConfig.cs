using CES.Infra.Models.Fuel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Fuel
{
    public class PriceConfig : IEntityTypeConfiguration<PriceEntity>
    {
        public void Configure(EntityTypeBuilder<PriceEntity> builder)
        {
            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Period)
              .HasColumnType("DATE")
              .IsRequired();
        }
    }
}
