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
    public class VehicleGroupConfig : IEntityTypeConfiguration<VehicleGroupEntity>
    {
        public void Configure(EntityTypeBuilder<VehicleGroupEntity> builder)
        {
            builder.Property(t => t.Code)
                .HasColumnType("INT");

            builder.Property(t => t.Name)
                .HasColumnType("NCHAR(30)");
        }
    }
}