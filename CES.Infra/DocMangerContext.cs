using CES.Infra.Config;
using CES.Infra.Config.MaterialReport;
using CES.Infra.Models;
using CES.Infra.Models.MaterialReport;
using Microsoft.EntityFrameworkCore;

namespace CES.Infra
{
    public class DocMangerContext : DbContext
    {
        //dotnet ef migrations add InitialCreate --context BlogContext --output-dir Migrations/SqlServerMigrations
        //Add-Migration  MaterialReport  -context DocMangerContext
        //  update-database -Context DocMangerContext

        public DocMangerContext(DbContextOptions<DocMangerContext> options)
            : base(options)
        { }

        public virtual DbSet<EmployeeEntity> Employees { get; set; }

        public virtual DbSet<DriverLicenseEntity> DriverLicenses { get; set; }

        public virtual DbSet<DivisionEntity> Divisions { get; set; }

        public virtual DbSet<DriverMedicalCertificateEntity> DriverMedicalCertificate { get; set; }

        public virtual DbSet<VehicleBrandEntity> VehicleBrands { get; set; }

        public virtual DbSet<VehicleModelEntity> VehicleModels { get; set; }


        public virtual DbSet<PartyEntity> Parties { get; set; }

        public virtual DbSet<ProductEntity> Products { get; set; }

        public virtual DbSet<ProductGroupAccountEntity> ProductsGroupAccount { get; set; }

        public virtual DbSet<UnitEntity> Units { get; set; }

        public virtual  DbSet<NumberPlateCarEntity> NumberPlateOfCar { get; set; }


        public virtual DbSet<FuelWorkCardEntity> FuelWorkCards { get; set; }

        public virtual DbSet<WorkCardDivisionsEntity> WorkCardDivisions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmployeeConfig());
            modelBuilder.ApplyConfiguration(new DriverLicenseConfig());
            modelBuilder.ApplyConfiguration(new DivisionConfig());
            modelBuilder.ApplyConfiguration(new MedicalCertificateConfig());
            modelBuilder.ApplyConfiguration(new VehicleBrandConfig());
            modelBuilder.ApplyConfiguration(new VehicleModelConfig());

            modelBuilder.ApplyConfiguration(new ProductConfig());
            modelBuilder.ApplyConfiguration(new ProductGroupAccountConfig());
            modelBuilder.ApplyConfiguration(new UnitConfig());
            modelBuilder.ApplyConfiguration(new PartyConfig());
            modelBuilder.ApplyConfiguration(new NumberPlateCarConfig());
            modelBuilder.ApplyConfiguration(new FuelWorkCardConfig());
            modelBuilder.ApplyConfiguration(new WorkCardDivisionConfig());

        }
}
}
