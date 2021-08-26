using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CES.Infra.Migrations
{
    public partial class createDriverMedicalCertificateEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "IX_DriverMedicalCertificate_EmployeeId",
                table: "DriverMedicalCertificate",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_DriverMedicalCertificate_SerialNumber",
                table: "DriverMedicalCertificate",
                column: "SerialNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DriverMedicalCertificate");
        }
    }
}
