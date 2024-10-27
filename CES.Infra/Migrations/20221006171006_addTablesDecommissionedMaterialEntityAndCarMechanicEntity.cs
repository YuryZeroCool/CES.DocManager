using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class addTablesDecommissionedMaterialEntityAndCarMechanicEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarMechanics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FIO = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarMechanics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DecommissionedMaterials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Period = table.Column<DateTime>(type: "DATE", nullable: false),
                    NumberPlateOfCar = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CarMechanicId = table.Column<int>(type: "int", nullable: false),
                    Materials = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DecommissionedMaterials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DecommissionedMaterials_CarMechanics_CarMechanicId",
                        column: x => x.CarMechanicId,
                        principalTable: "CarMechanics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DecommissionedMaterials_CarMechanicId",
                table: "DecommissionedMaterials",
                column: "CarMechanicId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DecommissionedMaterials");

            migrationBuilder.DropTable(
                name: "CarMechanics");
        }
    }
}
