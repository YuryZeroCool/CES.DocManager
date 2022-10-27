using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class CarMechanicConfig : IEntityTypeConfiguration<CarMechanicEntity>
    {
        public void Configure(EntityTypeBuilder<CarMechanicEntity> builder)
        {
            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(e => e.FIO)
                     .HasMaxLength(20).IsRequired(true);

            builder.HasMany(x => x.DecommissionedMaterials).WithOne(c => c.CarMechanic);
        }
    }
}
