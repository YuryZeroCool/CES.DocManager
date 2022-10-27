using CES.Infra.Models.Drivers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class DriverLicenseConfig : IEntityTypeConfiguration<DriverLicenseEntity>
    {
        public void Configure(EntityTypeBuilder<DriverLicenseEntity> builder)
        {
            builder.Property(t => t.Category)
                .HasMaxLength(100);

            builder.Property(t => t.IssueDate)
                .HasColumnType("DATE");

            builder.Property(t => t.ExpiryDate)
                .HasColumnType("DATE");

            builder.HasIndex(p => p.SerialNumber)
                .IsUnique(true);
        }
    }
}
