using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class NumberPlateCarConfig:IEntityTypeConfiguration<NumberPlateCarEntity>
    {
        public void Configure(EntityTypeBuilder<NumberPlateCarEntity> builder)
        {
            builder.HasMany(x => x.FuelWorkCards).WithOne(p => p.NumberPlateCar);

            builder.Property(t => t.Number)
                .HasMaxLength(100);

          
            builder.HasMany(x => x.DecommissionedMaterials).WithOne(p=>p.NumberPlateOfCar);
        }
    }
}
