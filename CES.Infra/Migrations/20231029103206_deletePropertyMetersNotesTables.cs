using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class deletePropertyMetersNotesTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HouseNumberEntityStreetEntity");

            migrationBuilder.DropColumn(
                name: "Meters",
                table: "NoteEntities");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Meters",
                table: "NoteEntities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "HouseNumberEntityStreetEntity",
                columns: table => new
                {
                    HouseNumbersId = table.Column<int>(type: "int", nullable: false),
                    StreetsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HouseNumberEntityStreetEntity", x => new { x.HouseNumbersId, x.StreetsId });
                    table.ForeignKey(
                        name: "FK_HouseNumberEntityStreetEntity_HouseNumbers_HouseNumbersId",
                        column: x => x.HouseNumbersId,
                        principalTable: "HouseNumbers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HouseNumberEntityStreetEntity_Streets_StreetsId",
                        column: x => x.StreetsId,
                        principalTable: "Streets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HouseNumberEntityStreetEntity_StreetsId",
                table: "HouseNumberEntityStreetEntity",
                column: "StreetsId");
        }
    }
}
