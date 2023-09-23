using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Mes
{
    public class ActConfig : IEntityTypeConfiguration<ActEntity>
    {
        public void Configure(EntityTypeBuilder<ActEntity> builder)
        {
            //builder
            //    .HasMany(e => e.Notes)
            //    .WithOne(e => e.Act)
            //    .HasForeignKey(e => e.ActId)
            //    .IsRequired();

            //builder.HasOne(e => e.Organization)
            //.WithMany(e => e.Acts)
            //.HasForeignKey(e => e.OrganizationId)
            //.IsRequired();

            builder.Property(x => x.DateOfWorkCompletion)
                     .HasColumnType("DATETIME");

            builder.Property(x => x.ActDateOfCreation)
                    .HasColumnType("DATETIME");
        }
    }
}
