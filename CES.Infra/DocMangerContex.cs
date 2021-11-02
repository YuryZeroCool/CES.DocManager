using CES.Infra.Config;
using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Configuration;

namespace CES.Infra
{
    public class DocMangerContex : DbContext
    {
        public virtual DbSet<EmployeeEntity> Employees { get; set; }

        public virtual DbSet<DriverLicenseEntity> DriverLicenses { get; set; }

        public virtual DbSet<Division> Divisions { get; set; }

        public virtual DbSet<DriverMedicalCertificateEntity> DriverMedicalCertificate { get; set; }
        public DocMangerContex(DbContextOptions<DocMangerContex> options)
    : base(options)
        { }
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            dbContextOptionsBuilder.LogTo(Console.WriteLine);
             dbContextOptionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("CONNECTION_STRING"));
            //dbContextOptionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["CONNECTION_STRING"].ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmployeeConfig());
            modelBuilder.ApplyConfiguration(new DriverLicenseConfig());
            modelBuilder.ApplyConfiguration(new DivisionConfig());
            modelBuilder.ApplyConfiguration(new MedicalCertificateConfig());
        }
    }
}
