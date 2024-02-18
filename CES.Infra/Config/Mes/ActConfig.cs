using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
using System.Reflection.Metadata;

namespace CES.Infra.Config.Mes
{
    public class ActKO514Config : IEntityTypeConfiguration<ActKO514Entity>
    {
        public void Configure(EntityTypeBuilder<ActKO514Entity> builder)
        {
            builder.Property(x => x.DateOfWorkCompletion)
                     .HasColumnType("DATETIME");

            builder.Property(x => x.ActDateOfCreation)
                    .HasColumnType("DATETIME");
        }
    }
}
