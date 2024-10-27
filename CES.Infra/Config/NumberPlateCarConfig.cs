using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class NumberPlateCarConfig : IEntityTypeConfiguration<NumberPlateOfCarEntity>
    {
        public void Configure(EntityTypeBuilder<NumberPlateOfCarEntity> builder)
        {
            builder.HasMany(x => x.FuelWorkCards)
                .WithOne(p => p.NumberPlateCar);

            builder.Property(t => t.Number)
                .HasMaxLength(100);

            builder.HasMany(x => x.DecommissionedMaterials)
                .WithOne(p => p.NumberPlateOfCar);

            builder.HasMany(x => x.Employees)
                .WithOne(p => p.CarNumber);

            builder.HasOne(x => x.VehicleModel)
                .WithMany(p => p.NumberPlateCar);
        }
    }
}
