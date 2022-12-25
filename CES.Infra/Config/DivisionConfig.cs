﻿using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config
{
    public class DivisionConfig : IEntityTypeConfiguration<DivisionEntity>
    {
        public void Configure(EntityTypeBuilder<DivisionEntity> builder)
        {
            builder.HasMany(x => x.EmployeeEntities).WithOne(p => p.DivisionNumber);
            builder.HasMany(x => x.NumbersPlateCarEntity).WithOne(p => p.DivisionNumber);
        }
    }
}
