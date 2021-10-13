using Microsoft.EntityFrameworkCore.Migrations;

namespace CES.Infra.Migrations
{
    public partial class DriverLicensenchar30 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "DriverLicenses",
                type: "NCHAR(30)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NCHAR(15)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "DriverLicenses",
                type: "NCHAR(15)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "NCHAR(30)",
                oldNullable: true);
        }
    }
}
