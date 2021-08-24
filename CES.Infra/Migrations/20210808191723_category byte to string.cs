using Microsoft.EntityFrameworkCore.Migrations;

namespace CES.Infra.Migrations
{
    public partial class categorybytetostring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DriverLicenses_Employees_EmployeeId",
                table: "DriverLicenses");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "DriverLicenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "DriverLicenses",
                type: "NCHAR(15)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NCHAR(15)");

            migrationBuilder.AddForeignKey(
                name: "FK_DriverLicenses_Employees_EmployeeId",
                table: "DriverLicenses",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DriverLicenses_Employees_EmployeeId",
                table: "DriverLicenses");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "DriverLicenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "DriverLicenses",
                type: "NCHAR(15)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "NCHAR(15)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DriverLicenses_Employees_EmployeeId",
                table: "DriverLicenses",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
