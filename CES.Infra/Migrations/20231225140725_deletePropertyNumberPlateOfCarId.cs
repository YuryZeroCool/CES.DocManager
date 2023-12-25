using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class deletePropertyNumberPlateOfCarId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Act_NumberPlateOfCar_NumberPlateOfCarId",
                table: "Act");

            migrationBuilder.DropIndex(
                name: "IX_Act_NumberPlateOfCarId",
                table: "Act");

            migrationBuilder.DropColumn(
                name: "NumberPlateOfCarId",
                table: "Act");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberPlateOfCarId",
                table: "Act",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Act_NumberPlateOfCarId",
                table: "Act",
                column: "NumberPlateOfCarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Act_NumberPlateOfCar_NumberPlateOfCarId",
                table: "Act",
                column: "NumberPlateOfCarId",
                principalTable: "NumberPlateOfCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
