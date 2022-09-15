using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class FuelWorkCardConfig : IEntityTypeConfiguration<FuelWorkCardEntity>
    {
        public void Configure(EntityTypeBuilder<FuelWorkCardEntity> builder)
        {
            builder.Property(x => x.WorkDate)
                .HasColumnType("DATE");

            builder.Property(t => t.WorkDate)
                .IsRequired();
        }
    }
}
