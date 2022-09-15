﻿// <auto-generated />
using System;
using CES.Infra;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CES.Infra.Migrations
{
    [DbContext(typeof(DocMangerContext))]
    partial class DocMangerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

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

            modelBuilder.Entity("CES.Infra.Models.DriverLicenseEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Category")
                        .HasColumnType("NCHAR(30)");

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

            modelBuilder.Entity("CES.Infra.Models.DriverMedicalCertificateEntity", b =>
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
                        .HasColumnType("NCHAR(15)");

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

                    b.HasIndex("DivisionNumberId");

                    b.HasIndex("PersonnelNumber")
                        .IsUnique();

                    b.ToTable("Employees");
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
                        .HasColumnType("NCHAR(30)");

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

            modelBuilder.Entity("CES.Infra.Models.NumberPlateCarEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("GarageNumber")
                        .HasColumnType("int");

                    b.Property<string>("Number")
                        .HasColumnType("NCHAR(30)");

                    b.Property<int?>("VehicleModelId")
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
                        .HasColumnType("NCHAR(30)");

                    b.Property<int?>("VehicleBrandId")
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
                        .HasColumnType("NCHAR(30)");

                    b.Property<DateTime>("PeriodReport")
                        .HasColumnType("DATE");

                    b.HasKey("Id");

                    b.ToTable("WorkCardDivisions");
                });

            modelBuilder.Entity("CES.Infra.Models.DriverLicenseEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.EmployeeEntity", "Employee")
                        .WithMany("DriverLicense")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("CES.Infra.Models.DriverMedicalCertificateEntity", b =>
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
                    b.HasOne("CES.Infra.Models.DivisionEntity", "DivisionNumber")
                        .WithMany("EmployeeEntities")
                        .HasForeignKey("DivisionNumberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DivisionNumber");
                });

            modelBuilder.Entity("CES.Infra.Models.FuelWorkCardEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.NumberPlateCarEntity", "NumberPlateCar")
                        .WithMany("FuelWorkCards")
                        .HasForeignKey("NumberPlateCarId");

                    b.Navigation("NumberPlateCar");
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

            modelBuilder.Entity("CES.Infra.Models.NumberPlateCarEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.VehicleModelEntity", "VehicleModel")
                        .WithMany("NumberPlateCar")
                        .HasForeignKey("VehicleModelId");

                    b.Navigation("VehicleModel");
                });

            modelBuilder.Entity("CES.Infra.Models.VehicleModelEntity", b =>
                {
                    b.HasOne("CES.Infra.Models.VehicleBrandEntity", "VehicleBrand")
                        .WithMany("VehiclesModels")
                        .HasForeignKey("VehicleBrandId");

                    b.Navigation("VehicleBrand");
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

            modelBuilder.Entity("CES.Infra.Models.NumberPlateCarEntity", b =>
                {
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
