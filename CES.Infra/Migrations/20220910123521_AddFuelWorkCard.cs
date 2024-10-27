using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddFuelWorkCard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NumberPlateCarEntity_VehicleModels_VehicleModelId",
                table: "NumberPlateCarEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NumberPlateCarEntity",
                table: "NumberPlateCarEntity");

            migrationBuilder.RenameTable(
                name: "NumberPlateCarEntity",
                newName: "NumberPlateOfCar");

            migrationBuilder.RenameIndex(
                name: "IX_NumberPlateCarEntity_VehicleModelId",
                table: "NumberPlateOfCar",
                newName: "IX_NumberPlateOfCar_VehicleModelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NumberPlateOfCar",
                table: "NumberPlateOfCar",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "FuelWorkCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkDate = table.Column<DateTime>(type: "DATE", nullable: false),
                    NumberPlateCarId = table.Column<int>(type: "int", nullable: true),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FuelWorkCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FuelWorkCards_NumberPlateOfCar_NumberPlateCarId",
                        column: x => x.NumberPlateCarId,
                        principalTable: "NumberPlateOfCar",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_FuelWorkCards_NumberPlateCarId",
                table: "FuelWorkCards",
                column: "NumberPlateCarId");

            migrationBuilder.CreateIndex(
                name: "IX_FuelWorkCards_WorkDate",
                table: "FuelWorkCards",
                column: "WorkDate",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_NumberPlateOfCar_VehicleModels_VehicleModelId",
                table: "NumberPlateOfCar",
                column: "VehicleModelId",
                principalTable: "VehicleModels",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NumberPlateOfCar_VehicleModels_VehicleModelId",
                table: "NumberPlateOfCar");

            migrationBuilder.DropTable(
                name: "FuelWorkCards");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NumberPlateOfCar",
                table: "NumberPlateOfCar");

            migrationBuilder.RenameTable(
                name: "NumberPlateOfCar",
                newName: "NumberPlateCarEntity");

            migrationBuilder.RenameIndex(
                name: "IX_NumberPlateOfCar_VehicleModelId",
                table: "NumberPlateCarEntity",
                newName: "IX_NumberPlateCarEntity_VehicleModelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NumberPlateCarEntity",
                table: "NumberPlateCarEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NumberPlateCarEntity_VehicleModels_VehicleModelId",
                table: "NumberPlateCarEntity",
                column: "VehicleModelId",
                principalTable: "VehicleModels",
                principalColumn: "Id");
        }
    }
}
