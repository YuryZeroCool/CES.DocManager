using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddTableManyDivisionsToManyCarNumbers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DivisionEntityNumberPlateOfCarEntity",
                columns: table => new
                {
                    DivisionsId = table.Column<int>(type: "int", nullable: false),
                    NumberPlateOfCarsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DivisionEntityNumberPlateOfCarEntity", x => new { x.DivisionsId, x.NumberPlateOfCarsId });
                    table.ForeignKey(
                        name: "FK_DivisionEntityNumberPlateOfCarEntity_Divisions_DivisionsId",
                        column: x => x.DivisionsId,
                        principalTable: "Divisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DivisionEntityNumberPlateOfCarEntity_NumberPlateOfCar_NumberPlateOfCarsId",
                        column: x => x.NumberPlateOfCarsId,
                        principalTable: "NumberPlateOfCar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DivisionEntityNumberPlateOfCarEntity_NumberPlateOfCarsId",
                table: "DivisionEntityNumberPlateOfCarEntity",
                column: "NumberPlateOfCarsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DivisionEntityNumberPlateOfCarEntity");
        }
    }
}
