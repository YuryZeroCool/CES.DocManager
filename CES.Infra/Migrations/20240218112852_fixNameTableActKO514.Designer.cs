﻿// <auto-generated />
using System;
using CES.Infra;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CES.Infra.Migrations
{
    [DbContext(typeof(DocMangerContext))]
    [Migration("20240218112852_fixNameTableActKO514")]
    partial class fixNameTableActKO514
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CES.Infra.Models.CarMechanicEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("FIO")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("CarMechanics");
                });

            modelBuilder.Entity("CES.Infra.Models.DivisionEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Divisions");
                });

            modelBuilder.Entity("CES.Infra.Models.Drivers.DriverLicenseEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Category")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExpiryDate")
                        .HasColumnType("DATE");

                    b.Property<DateTime>("IssueDate")
                        .HasColumnType("DATE");

                    b.Property<string>("SerialNumber")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("SerialNumber")
                        .IsUnique()
                        .HasFilter("[SerialNumber] IS NOT NULL");

                    b.ToTable("DriverLicenses");
                });

            modelBuilder.Entity("CES.Infra.Models.Drivers.DriverMedicalCertificateEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExpiryDate")
                        .HasColumnType("DATE");

                    b.Property<DateTime>("IssueDate")
                        .HasColumnType("DATE");

                    b.Property<string>("SerialNumber")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("SerialNumber")
                        .IsUnique();

                    b.ToTable("DriverMedicalCertificate");
                });

            modelBuilder.Entity("CES.Infra.Models.EmployeeEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("BthDate")
                        .HasColumnType("DATE");

                    b.Property<int?>("CarNumberId")
                        .HasColumnType("int");

                    b.Property<int>("DivisionNumberId")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PersonnelNumber")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CarNumberId");

                    b.HasIndex("DivisionNumberId");

                    b.HasIndex("PersonnelNumber")
                        .IsUnique();

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("CES.Infra.Models.Fuel.FuelEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Fuels");
                });

            modelBuilder.Entity("CES.Infra.Models.Fuel.PriceEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("FuelEntityId")
                        .HasColumnType("int");

                    b.Property<int>("FuelId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Period")
                        .HasColumnType("DATE");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("FuelEntityId");

                    b.ToTable("Prices");
                });

            modelBuilder.Entity("CES.Infra.Models.FuelWorkCardEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte[]>("Data")
                        .HasColumnType("varbinary(max)");

                    b.Property<int?>("NumberPlateCarId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("WorkDate")
                        .IsRequired()
                        .HasColumnType("DATE");

                    b.HasKey("Id");

                    b.HasIndex("NumberPlateCarId");

                    b.ToTable("FuelWorkCards");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.DecommissionedMaterialEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("CarMechanicId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CurrentDate")
                        .HasColumnType("DATE");

                    b.Property<byte[]>("Materials")
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("NumberPlateOfCarId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CarMechanicId");

                    b.HasIndex("NumberPlateOfCarId");

                    b.ToTable("DecommissionedMaterials");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.EnshrinedMaterialEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AccountName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Count")
                        .HasColumnType("float");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("smalldatetime");

                    b.Property<string>("NameMaterial")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("NameParty")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("NumberPlateCar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("PartyDate")
                        .HasColumnType("smalldatetime");

                    b.Property<decimal>("Price")
                        .HasPrecision(12, 2)
                        .HasColumnType("decimal(12,2)");

                    b.Property<string>("Unit")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VehicleBrand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VehicleModel")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EnshrinedMaterial");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.PartyEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<double>("Count")
                        .HasColumnType("float");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("smalldatetime");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("PartyDate")
                        .HasColumnType("smalldatetime");

                    b.Property<decimal>("Price")
                        .HasPrecision(12, 2)
                        .HasColumnType("decimal(12,2)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalSum")
                        .HasPrecision(12, 2)
                        .HasColumnType("decimal(12,2)");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("Parties");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.ProductEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int>("ProductGroupAccountId")
                        .HasColumnType("int");

                    b.Property<int>("UnitId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProductGroupAccountId");

                    b.HasIndex("UnitId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.ProductGroupAccountEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AccountName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("ProductsGroupAccount");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.UnitEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("Id");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.UsedMaterialEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte[]>("Materials")
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime>("Period")
                        .HasColumnType("DATE");

                    b.HasKey("Id");

                    b.ToTable("UsedMaterials");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.ActKO514Entity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("ActDateOfCreation")
                        .HasColumnType("DATETIME");

                    b.Property<int>("ActTypeEntityId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfWorkCompletion")
                        .HasColumnType("DATETIME");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<int>("NumberPlateOfCarId")
                        .HasColumnType("int");

                    b.Property<int>("OrganizationId")
                        .HasColumnType("int");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("Vat")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("ActTypeEntityId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("NumberPlateOfCarId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("ActKO514");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.ActTypeEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("ActTypes");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.EntranceEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Entrances");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.HouseNumberEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Number")
                        .IsUnique();

                    b.ToTable("HouseNumbers");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.NoteEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("DATETIME");

                    b.Property<int?>("EntranceId")
                        .HasColumnType("int");

                    b.Property<int?>("HouseNumberId")
                        .HasColumnType("int");

                    b.Property<bool>("IsChecked")
                        .HasColumnType("bit");

                    b.Property<int?>("StreetId")
                        .HasColumnType("int");

                    b.Property<string>("Tel")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EntranceId");

                    b.HasIndex("HouseNumberId");

                    b.HasIndex("StreetId");

                    b.ToTable("NoteEntities");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.OrganizationEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PayerAccountNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("OrganizationEntities");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.StreetEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Streets");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.WorkNameInActEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DateOfCreation")
                        .HasColumnType("DATETIME");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UnitId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UnitId");

                    b.ToTable("WorkNameInAct");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.WorkPerformActEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("Count")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("NameId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("NameId");

                    b.ToTable("WorkPerformsAct");
                });

            modelBuilder.Entity("CES.Infra.Models.NumberPlateOfCarEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("GarageNumber")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Number")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("VehicleModelId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VehicleModelId");

                    b.ToTable("NumberPlateOfCar");
                });

            modelBuilder.Entity("CES.Infra.Models.VehicleBrandEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("VehicleBrands");
                });

            modelBuilder.Entity("CES.Infra.Models.VehicleModelEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("VehicleBrandId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VehicleBrandId");

                    b.ToTable("VehicleModels");
                });

            modelBuilder.Entity("CES.Infra.Models.WorkCardDivisionsEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte[]>("Date")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Division")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("PeriodReport")
                        .HasColumnType("DATE");

                    b.HasKey("Id");

                    b.ToTable("WorkCardDivisions");
                });

            modelBuilder.Entity("DivisionEntityNumberPlateOfCarEntity", b =>
                {
                    b.Property<int>("DivisionsId")
                        .HasColumnType("int");

                    b.Property<int>("NumberPlateOfCarsId")
                        .HasColumnType("int");

                    b.HasKey("DivisionsId", "NumberPlateOfCarsId");

                    b.HasIndex("NumberPlateOfCarsId");

                    b.ToTable("DivisionEntityNumberPlateOfCarEntity");
                });

            modelBuilder.Entity("CES.Infra.Models.Drivers.DriverLicenseEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.EmployeeEntity", "Employee")
                        .WithMany("DriverLicense")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("CES.Infra.Models.Drivers.DriverMedicalCertificateEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.EmployeeEntity", "Employee")
                        .WithMany("MedicalCertificates")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("CES.Infra.Models.EmployeeEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.NumberPlateOfCarEntity", "CarNumber")
                        .WithMany("Employees")
                        .HasForeignKey("CarNumberId");

                    b.HasOne("CES.Infra.Models.DivisionEntity", "DivisionNumber")
                        .WithMany("EmployeeEntities")
                        .HasForeignKey("DivisionNumberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CarNumber");

                    b.Navigation("DivisionNumber");
                });

            modelBuilder.Entity("CES.Infra.Models.Fuel.PriceEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.Fuel.FuelEntity", "FuelEntity")
                        .WithMany("PriceEntities")
                        .HasForeignKey("FuelEntityId");

                    b.Navigation("FuelEntity");
                });

            modelBuilder.Entity("CES.Infra.Models.FuelWorkCardEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.NumberPlateOfCarEntity", "NumberPlateCar")
                        .WithMany("FuelWorkCards")
                        .HasForeignKey("NumberPlateCarId");

                    b.Navigation("NumberPlateCar");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.DecommissionedMaterialEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.CarMechanicEntity", "CarMechanic")
                        .WithMany("DecommissionedMaterials")
                        .HasForeignKey("CarMechanicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CES.Infra.Models.NumberPlateOfCarEntity", "NumberPlateOfCar")
                        .WithMany("DecommissionedMaterials")
                        .HasForeignKey("NumberPlateOfCarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CarMechanic");

                    b.Navigation("NumberPlateOfCar");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.PartyEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.MaterialReport.ProductEntity", "Product")
                        .WithMany("Parties")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.ProductEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.MaterialReport.ProductGroupAccountEntity", "Account")
                        .WithMany("Products")
                        .HasForeignKey("ProductGroupAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CES.Infra.Models.MaterialReport.UnitEntity", "Unit")
                        .WithMany("Products")
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.ActKO514Entity", b =>
                {
                    b.HasOne("CES.Infra.Models.Mes.ActTypeEntity", "ActType")
                        .WithMany()
                        .HasForeignKey("ActTypeEntityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CES.Infra.Models.EmployeeEntity", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CES.Infra.Models.NumberPlateOfCarEntity", "NumberPlateOfCar")
                        .WithMany()
                        .HasForeignKey("NumberPlateOfCarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CES.Infra.Models.Mes.OrganizationEntity", "Organization")
                        .WithMany()
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ActType");

                    b.Navigation("Employee");

                    b.Navigation("NumberPlateOfCar");

                    b.Navigation("Organization");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.NoteEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.Mes.EntranceEntity", "Entrance")
                        .WithMany()
                        .HasForeignKey("EntranceId");

                    b.HasOne("CES.Infra.Models.Mes.HouseNumberEntity", "HouseNumber")
                        .WithMany()
                        .HasForeignKey("HouseNumberId");

                    b.HasOne("CES.Infra.Models.Mes.StreetEntity", "Street")
                        .WithMany()
                        .HasForeignKey("StreetId");

                    b.Navigation("Entrance");

                    b.Navigation("HouseNumber");

                    b.Navigation("Street");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.WorkNameInActEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.MaterialReport.UnitEntity", "Unit")
                        .WithMany()
                        .HasForeignKey("UnitId");

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("CES.Infra.Models.Mes.WorkPerformActEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.Mes.WorkNameInActEntity", "Name")
                        .WithMany()
                        .HasForeignKey("NameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Name");
                });

            modelBuilder.Entity("CES.Infra.Models.NumberPlateOfCarEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.VehicleModelEntity", "VehicleModel")
                        .WithMany("NumberPlateCar")
                        .HasForeignKey("VehicleModelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("VehicleModel");
                });

            modelBuilder.Entity("CES.Infra.Models.VehicleModelEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.VehicleBrandEntity", "VehicleBrand")
                        .WithMany("VehiclesModels")
                        .HasForeignKey("VehicleBrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("VehicleBrand");
                });

            modelBuilder.Entity("DivisionEntityNumberPlateOfCarEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.DivisionEntity", null)
                        .WithMany()
                        .HasForeignKey("DivisionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CES.Infra.Models.NumberPlateOfCarEntity", null)
                        .WithMany()
                        .HasForeignKey("NumberPlateOfCarsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CES.Infra.Models.CarMechanicEntity", b =>
                {
                    b.Navigation("DecommissionedMaterials");
                });

            modelBuilder.Entity("CES.Infra.Models.DivisionEntity", b =>
                {
                    b.Navigation("EmployeeEntities");
                });

            modelBuilder.Entity("CES.Infra.Models.EmployeeEntity", b =>
                {
                    b.Navigation("DriverLicense");

                    b.Navigation("MedicalCertificates");
                });

            modelBuilder.Entity("CES.Infra.Models.Fuel.FuelEntity", b =>
                {
                    b.Navigation("PriceEntities");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.ProductEntity", b =>
                {
                    b.Navigation("Parties");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.ProductGroupAccountEntity", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("CES.Infra.Models.MaterialReport.UnitEntity", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("CES.Infra.Models.NumberPlateOfCarEntity", b =>
                {
                    b.Navigation("DecommissionedMaterials");

                    b.Navigation("Employees");

                    b.Navigation("FuelWorkCards");
                });

            modelBuilder.Entity("CES.Infra.Models.VehicleBrandEntity", b =>
                {
                    b.Navigation("VehiclesModels");
                });

            modelBuilder.Entity("CES.Infra.Models.VehicleModelEntity", b =>
                {
                    b.Navigation("NumberPlateCar");
                });
#pragma warning restore 612, 618
        }
    }
}
