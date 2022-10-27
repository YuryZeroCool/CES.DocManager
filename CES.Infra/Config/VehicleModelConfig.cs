using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class VehicleModelConfig : IEntityTypeConfiguration<VehicleModelEntity>
    {
        public void Configure(EntityTypeBuilder<VehicleModelEntity> builder)
        {
            builder.Property(t => t.Name).HasMaxLength(50);
            builder.HasMany(x => x.NumberPlateCar).WithOne(p => p.VehicleModel);
        }
    }
}
