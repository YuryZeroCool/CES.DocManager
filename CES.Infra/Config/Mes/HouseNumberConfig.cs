using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Mes
{
    public class HouseNumberConfig : IEntityTypeConfiguration<HouseNumberEntity>
    {
        public void Configure(EntityTypeBuilder<HouseNumberEntity> builder)
        {
            builder.HasIndex(x => x.Number).IsUnique(true);
        }
    }
}
