using CES.Infra.Config;
using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CES.Infra
{
    public class DocMangerContex : DbContext
    {
        public virtual DbSet<EmployeeEntity> Employees { get; set; }

        public virtual DbSet<DriverLicenseEntity> DriverLicenses { get; set; }

        public virtual DbSet<Division> Divisions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            dbContextOptionsBuilder.LogTo(Console.WriteLine);
            dbContextOptionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("CONNECTION_STRING"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmployeeConfig());
            modelBuilder.ApplyConfiguration(new DriverLicenseConfig());
            modelBuilder.ApplyConfiguration(new DivisionConfig());
        }

        public object ToList()
        {
            throw new NotImplementedException();
        }
    }
}
