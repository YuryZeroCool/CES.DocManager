using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Mes
{
    internal class ContractConfig : IEntityTypeConfiguration<ContractEntity>
    {
        public void Configure(EntityTypeBuilder<ContractEntity> builder)
        {
            builder.Property(x => x.CreationDate)
                     .HasColumnType("DATETIME");
            builder.Property(x => x.StartDateOfWork)
                    .HasColumnType("DATETIME");
            builder.Property(x => x.EndDateOfWork)
                   .HasColumnType("DATETIME");
            builder.Property(x => x.ExpirationDate)
                   .HasColumnType("DATETIME");
        }
    }
}