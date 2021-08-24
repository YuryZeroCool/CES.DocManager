using Microsoft.EntityFrameworkCore.Migrations;

namespace CES.Infra.Migrations
{
    public partial class addcolumnCategoryNchar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "DriverLicenses",
                type: "NCHAR(15)",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "Category",
                table: "DriverLicenses",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "NCHAR(15)");
        }
    }
}
