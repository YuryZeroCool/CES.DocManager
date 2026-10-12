using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddOwnerRoleToMaterials : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerRole",
                table: "Products",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "admin");

            migrationBuilder.AddColumn<string>(
                name: "OwnerRole",
                table: "EnshrinedMaterial",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerRole",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "OwnerRole",
                table: "EnshrinedMaterial");
        }
    }
}
