using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddNoteEntityHouseNumberStreetTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HouseNumberId",
                table: "NoteEntities",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StreetId",
                table: "NoteEntities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_NoteEntities_HouseNumberId",
                table: "NoteEntities",
                column: "HouseNumberId");

            migrationBuilder.CreateIndex(
                name: "IX_NoteEntities_StreetId",
                table: "NoteEntities",
                column: "StreetId");

            migrationBuilder.AddForeignKey(
                name: "FK_NoteEntities_HouseNumbers_HouseNumberId",
                table: "NoteEntities",
                column: "HouseNumberId",
                principalTable: "HouseNumbers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NoteEntities_Streets_StreetId",
                table: "NoteEntities",
                column: "StreetId",
                principalTable: "Streets",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NoteEntities_HouseNumbers_HouseNumberId",
                table: "NoteEntities");

            migrationBuilder.DropForeignKey(
                name: "FK_NoteEntities_Streets_StreetId",
                table: "NoteEntities");

            migrationBuilder.DropIndex(
                name: "IX_NoteEntities_HouseNumberId",
                table: "NoteEntities");

            migrationBuilder.DropIndex(
                name: "IX_NoteEntities_StreetId",
                table: "NoteEntities");

            migrationBuilder.DropColumn(
                name: "HouseNumberId",
                table: "NoteEntities");

            migrationBuilder.DropColumn(
                name: "StreetId",
                table: "NoteEntities");
        }
    }
}
