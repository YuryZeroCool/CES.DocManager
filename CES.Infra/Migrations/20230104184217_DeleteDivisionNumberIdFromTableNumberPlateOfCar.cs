using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class DeleteDivisionNumberIdFromTableNumberPlateOfCar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NumberPlateOfCar_Divisions_DivisionNumberId",
                table: "NumberPlateOfCar");

            migrationBuilder.DropIndex(
                name: "IX_NumberPlateOfCar_DivisionNumberId",
                table: "NumberPlateOfCar");

            migrationBuilder.DropColumn(
                name: "DivisionNumberId",
                table: "NumberPlateOfCar");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DivisionNumberId",
                table: "NumberPlateOfCar",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_NumberPlateOfCar_DivisionNumberId",
                table: "NumberPlateOfCar",
                column: "DivisionNumberId");

            migrationBuilder.AddForeignKey(
                name: "FK_NumberPlateOfCar_Divisions_DivisionNumberId",
                table: "NumberPlateOfCar",
                column: "DivisionNumberId",
                principalTable: "Divisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
