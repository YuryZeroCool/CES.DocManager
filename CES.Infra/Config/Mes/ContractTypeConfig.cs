using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;

namespace CES.Infra.Config.Mes
{
    internal class ContractTypeConfig : IEntityTypeConfiguration<ContractTypeEntity>
    {

        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<ContractTypeEntity> builder)
        {
            builder.HasIndex(p => p.Name)
                 .IsUnique(true);
        }
    }
}