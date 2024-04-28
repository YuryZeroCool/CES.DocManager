using CES.Infra.Config;
using CES.Infra.Config.Fuel;
using CES.Infra.Config.MaterialReport;
using CES.Infra.Config.Mes;
using CES.Infra.Models;
using CES.Infra.Models.Drivers;
using CES.Infra.Models.Fuel;
using CES.Infra.Models.MaterialReport;
using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;

namespace CES.Infra
{
    public class DocMangerContext : DbContext
    {
        //Add-Migration RemoveUnnecessaryColumnsAndTables -context DocMangerContext

        //update-database -context DocMangerContext   

        //update-database -context DocMangerContext -Args '--environment Production'

        //update-database -context DocMangerContext   PriceOfWorkInActEntityWorkNameInActEntity

        // Remove-migration -context DocMangerContext  

        public DocMangerContext(DbContextOptions<DocMangerContext> options)
            : base(options)
        { }

        public virtual DbSet<EmployeeEntity>? Employees { get; set; }

        public virtual DbSet<DriverLicenseEntity>? DriverLicenses { get; set; }

        public virtual DbSet<DivisionEntity>? Divisions { get; set; }

        public virtual DbSet<DriverMedicalCertificateEntity>? DriverMedicalCertificate { get; set; }

        public virtual DbSet<VehicleBrandEntity>? VehicleBrands { get; set; }

        public virtual DbSet<VehicleModelEntity>? VehicleModels { get; set; }

        public virtual DbSet<PartyEntity>? Parties { get; set; }

        public virtual DbSet<ProductEntity>? Products { get; set; }

        public virtual DbSet<ProductGroupAccountEntity>? ProductsGroupAccount { get; set; }

        public virtual DbSet<UnitEntity>? Units { get; set; }

        public virtual DbSet<NumberPlateOfCarEntity>? NumberPlateOfCar { get; set; }

        public virtual DbSet<FuelWorkCardEntity>? FuelWorkCards { get; set; }

        public virtual DbSet<WorkCardDivisionsEntity>? WorkCardDivisions { get; set; }

        public virtual DbSet<FuelEntity>? Fuels { get; set; }

        public virtual DbSet<PriceEntity>? Prices { get; set; }

        public virtual DbSet<EnshrinedMaterialEntity>? EnshrinedMaterial { get; set; }

        public virtual DbSet<DecommissionedMaterialEntity>? DecommissionedMaterials { get; set; }

        public virtual DbSet<CarMechanicEntity>? CarMechanics { get; set; }

        public virtual DbSet<UsedMaterialEntity>? UsedMaterials { get; set; }

        public virtual DbSet<NoteEntity>? NoteEntities { get; set; }

        public virtual DbSet<OrganizationEntity>? OrganizationEntities { get; set; }

        public virtual DbSet<ActEntity>? Act { get; set; }

        public virtual DbSet<ActTypeEntity>? ActTypes { get; set; }

        public virtual DbSet<StreetEntity>? Streets { get; set; }

        public virtual DbSet<EntranceEntity>? Entrances { get; set; }

        public virtual DbSet<HouseNumberEntity>? HouseNumbers { get; set; }

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
            modelBuilder.ApplyConfiguration(new FuelConfig());
            modelBuilder.ApplyConfiguration(new PriceConfig());
            modelBuilder.ApplyConfiguration(new EnshrinedMaterialConfig());
            modelBuilder.ApplyConfiguration(new DecommissionedMaterialConfig());
            modelBuilder.ApplyConfiguration(new CarMechanicConfig());
            modelBuilder.ApplyConfiguration(new UsedMaterialConf());
            modelBuilder.ApplyConfiguration(new NoteConfig());
            modelBuilder.ApplyConfiguration(new OrganizationConfig());
            modelBuilder.ApplyConfiguration(new OrganizationConfig());
            modelBuilder.ApplyConfiguration(new ActConfig());
            modelBuilder.ApplyConfiguration(new ActTypeConfig());
            modelBuilder.ApplyConfiguration(new HouseNumberConfig());
            modelBuilder.ApplyConfiguration(new StreetConfig());
        }
    }
}
