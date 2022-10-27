using CES.Infra.Models.Drivers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class MedicalCertificateConfig : IEntityTypeConfiguration<DriverMedicalCertificateEntity>
    {
        public void Configure(EntityTypeBuilder<DriverMedicalCertificateEntity> builder)
        {
            builder.Property(t => t.SerialNumber)
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
