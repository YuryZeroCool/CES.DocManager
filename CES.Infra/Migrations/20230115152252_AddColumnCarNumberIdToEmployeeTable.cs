using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddColumnCarNumberIdToEmployeeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NumberPlateOfCar_VehicleModels_VehicleModelId",
                table: "NumberPlateOfCar");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleModelId",
                table: "NumberPlateOfCar",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CarNumberId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_CarNumberId",
                table: "Employees",
                column: "CarNumberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_NumberPlateOfCar_CarNumberId",
                table: "Employees",
                column: "CarNumberId",
                principalTable: "NumberPlateOfCar",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NumberPlateOfCar_VehicleModels_VehicleModelId",
                table: "NumberPlateOfCar",
                column: "VehicleModelId",
                principalTable: "VehicleModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_NumberPlateOfCar_CarNumberId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_NumberPlateOfCar_VehicleModels_VehicleModelId",
                table: "NumberPlateOfCar");

            migrationBuilder.DropIndex(
                name: "IX_Employees_CarNumberId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "CarNumberId",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleModelId",
                table: "NumberPlateOfCar",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_NumberPlateOfCar_VehicleModels_VehicleModelId",
                table: "NumberPlateOfCar",
                column: "VehicleModelId",
                principalTable: "VehicleModels",
                principalColumn: "Id");
        }
    }
}
