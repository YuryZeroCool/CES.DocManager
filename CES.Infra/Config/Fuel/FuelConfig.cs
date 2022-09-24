using CES.Infra.Models.Fuel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Fuel
{
    public class FuelConfig : IEntityTypeConfiguration<FuelEntity>
    {
        public void Configure(EntityTypeBuilder<FuelEntity> builder)
        {
            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.HasMany(x => x.PriceEntities)
                .WithOne(p => p.FuelEntity);

            builder.Property(e => e.Name)
                 .IsRequired();
        }
    }
}
