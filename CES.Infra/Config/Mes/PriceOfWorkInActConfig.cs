using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Mes
{
    public class PriceOfWorkInActConfig : IEntityTypeConfiguration<PriceOfWorkInActEntity>
    {
        public void Configure(EntityTypeBuilder<PriceOfWorkInActEntity> builder)
        {
            builder.Property(x => x.Price)
           .HasColumnType("decimal(10, 2)");        
        }
    }

}
