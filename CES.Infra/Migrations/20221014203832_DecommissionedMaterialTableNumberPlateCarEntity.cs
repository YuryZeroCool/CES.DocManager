using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class DecommissionedMaterialTableNumberPlateCarEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberPlateOfCar",
                table: "DecommissionedMaterials");

            migrationBuilder.AddColumn<int>(
                name: "NumberPlateOfCarId",
                table: "DecommissionedMaterials",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DecommissionedMaterials_NumberPlateOfCarId",
                table: "DecommissionedMaterials",
                column: "NumberPlateOfCarId");

            migrationBuilder.AddForeignKey(
                name: "FK_DecommissionedMaterials_NumberPlateOfCar_NumberPlateOfCarId",
                table: "DecommissionedMaterials",
                column: "NumberPlateOfCarId",
                principalTable: "NumberPlateOfCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DecommissionedMaterials_NumberPlateOfCar_NumberPlateOfCarId",
                table: "DecommissionedMaterials");

            migrationBuilder.DropIndex(
                name: "IX_DecommissionedMaterials_NumberPlateOfCarId",
                table: "DecommissionedMaterials");

            migrationBuilder.DropColumn(
                name: "NumberPlateOfCarId",
                table: "DecommissionedMaterials");

            migrationBuilder.AddColumn<string>(
                name: "NumberPlateOfCar",
                table: "DecommissionedMaterials",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);
        }
    }
}
