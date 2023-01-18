using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class FixNumbersPlateCarKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NumberPlateOfCar_Divisions_DivisionNumberId",
                table: "NumberPlateOfCar");

            migrationBuilder.AlterColumn<int>(
                name: "DivisionNumberId",
                table: "NumberPlateOfCar",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_NumberPlateOfCar_Divisions_DivisionNumberId",
                table: "NumberPlateOfCar",
                column: "DivisionNumberId",
                principalTable: "Divisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NumberPlateOfCar_Divisions_DivisionNumberId",
                table: "NumberPlateOfCar");

            migrationBuilder.AlterColumn<int>(
                name: "DivisionNumberId",
                table: "NumberPlateOfCar",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_NumberPlateOfCar_Divisions_DivisionNumberId",
                table: "NumberPlateOfCar",
                column: "DivisionNumberId",
                principalTable: "Divisions",
                principalColumn: "Id");
        }
    }
}
