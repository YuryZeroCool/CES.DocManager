using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CES.Infra.Config
{
    public class WorkCardDivisionConfig : IEntityTypeConfiguration<WorkCardDivisionsEntity>
    {
        public void Configure(EntityTypeBuilder<WorkCardDivisionsEntity> builder)
        {
            builder.Property(x => x.PeriodReport)
               .HasColumnType("DATE");

            builder.Property(t => t.Division)
                   .HasMaxLength(100);
        }
    }
}
