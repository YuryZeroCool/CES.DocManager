using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    internal class VehicleBrandConfig : IEntityTypeConfiguration<VehicleBrandEntity>
    {
        public void Configure(EntityTypeBuilder<VehicleBrandEntity> builder)
        {
            builder.HasMany(x => x.VehiclesModels)
                .WithOne(p => p.VehicleBrand);
        }
    }
}
