using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddPropertytoActNotesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActId",
                table: "NoteEntities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_NoteEntities_ActId",
                table: "NoteEntities",
                column: "ActId");

            migrationBuilder.AddForeignKey(
                name: "FK_NoteEntities_Act_ActId",
                table: "NoteEntities",
                column: "ActId",
                principalTable: "Act",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NoteEntities_Act_ActId",
                table: "NoteEntities");

            migrationBuilder.DropIndex(
                name: "IX_NoteEntities_ActId",
                table: "NoteEntities");

            migrationBuilder.DropColumn(
                name: "ActId",
                table: "NoteEntities");
        }
    }
}
