using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class DivisionConfig : IEntityTypeConfiguration<Division>
    {
        public void Configure(EntityTypeBuilder<Division> builder)
        {
            builder.HasMany(x => x.EmployeeEntities).WithOne(p => p.DivisionNumber);
        }
    }
}
