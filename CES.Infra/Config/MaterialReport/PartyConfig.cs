using CES.Infra.Models.MaterialReport;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.MaterialReport
{
    public class PartyConfig : IEntityTypeConfiguration<PartyEntity>
    {
        public void Configure(EntityTypeBuilder<PartyEntity> builder)
        {
            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Price).HasPrecision(12, 2);
            builder.Property(p => p.PartyDate)
                .HasColumnType("smalldatetime");
            builder.Property(p => p.DateCreated)
                .HasColumnType("smalldatetime");
        }
    }
}
