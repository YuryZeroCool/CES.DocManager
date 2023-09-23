using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Mes
{
    public class WorkNameInActConfig : IEntityTypeConfiguration<WorkNameInActEntity>
    {
        public void Configure(EntityTypeBuilder<WorkNameInActEntity> builder)
        {
            builder.Property(x => x.DateOfCreation)
                .HasColumnType("DATETIME");
        }
    }
}