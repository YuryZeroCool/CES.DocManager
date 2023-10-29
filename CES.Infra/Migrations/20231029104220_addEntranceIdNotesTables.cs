using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class addEntranceIdNotesTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EntranceId",
                table: "NoteEntities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_NoteEntities_EntranceId",
                table: "NoteEntities",
                column: "EntranceId");

            migrationBuilder.AddForeignKey(
                name: "FK_NoteEntities_Entrances_EntranceId",
                table: "NoteEntities",
                column: "EntranceId",
                principalTable: "Entrances",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NoteEntities_Entrances_EntranceId",
                table: "NoteEntities");

            migrationBuilder.DropIndex(
                name: "IX_NoteEntities_EntranceId",
                table: "NoteEntities");

            migrationBuilder.DropColumn(
                name: "EntranceId",
                table: "NoteEntities");
        }
    }
}
