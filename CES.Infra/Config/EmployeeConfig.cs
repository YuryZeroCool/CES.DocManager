using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class EmployeeConfig : IEntityTypeConfiguration<EmployeeEntity>
    {
        public void Configure(EntityTypeBuilder<EmployeeEntity> builder)
        {
            builder.HasMany(x => x.DriverLicense)
                .WithOne(c => c.Employee);

            builder.HasMany(x => x.MedicalCertificates)
                .WithOne(c => c.Employee);

            builder.Property(x => x.BthDate)
                .HasColumnType("DATE");

            builder.Property(t => t.PersonnelNumber)
                .IsRequired();

            builder.HasIndex(p => p.PersonnelNumber)
                .IsUnique();

            //builder.Property(t => t.CarNumber)
            //    .IsRequired(false);
        }
    }
}
