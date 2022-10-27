using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AccountName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleModels_VehicleBrands_VehicleBrandId",
                table: "VehicleModels");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleBrandId",
                table: "VehicleModels",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AccountName",
                table: "EnshrinedMaterial",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleModels_VehicleBrands_VehicleBrandId",
                table: "VehicleModels",
                column: "VehicleBrandId",
                principalTable: "VehicleBrands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleModels_VehicleBrands_VehicleBrandId",
                table: "VehicleModels");

            migrationBuilder.DropColumn(
                name: "AccountName",
                table: "EnshrinedMaterial");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleBrandId",
                table: "VehicleModels",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleModels_VehicleBrands_VehicleBrandId",
                table: "VehicleModels",
                column: "VehicleBrandId",
                principalTable: "VehicleBrands",
                principalColumn: "Id");
        }
    }
}
