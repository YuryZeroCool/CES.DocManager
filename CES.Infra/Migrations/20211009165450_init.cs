using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CES.Infra.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Divisions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Divisions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonnelNumber = table.Column<int>(type: "int", nullable: false),
                    BthDate = table.Column<DateTime>(type: "DATE", nullable: false),
                    DivisionNumberId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Divisions_DivisionNumberId",
                        column: x => x.DivisionNumberId,
                        principalTable: "Divisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DriverLicenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SerialNumber = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    IssueDate = table.Column<DateTime>(type: "DATE", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "DATE", nullable: false),
                    Category = table.Column<string>(type: "NCHAR(15)", nullable: true),
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverLicenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DriverLicenses_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DriverMedicalCertificate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SerialNumber = table.Column<string>(type: "NCHAR(15)", nullable: false),
                    IssueDate = table.Column<DateTime>(type: "DATE", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "DATE", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverMedicalCertificate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DriverMedicalCertificate_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DriverLicenses_EmployeeId",
                table: "DriverLicenses",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_DriverLicenses_SerialNumber",
                table: "DriverLicenses",
                column: "SerialNumber",
                unique: true,
                filter: "[SerialNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_DriverMedicalCertificate_EmployeeId",
                table: "DriverMedicalCertificate",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_DriverMedicalCertificate_SerialNumber",
                table: "DriverMedicalCertificate",
                column: "SerialNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DivisionNumberId",
                table: "Employees",
                column: "DivisionNumberId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PersonnelNumber",
                table: "Employees",
                column: "PersonnelNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DriverLicenses");

            migrationBuilder.DropTable(
                name: "DriverMedicalCertificate");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Divisions");
        }
    }
}
