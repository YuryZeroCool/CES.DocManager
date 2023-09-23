using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddTableAct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActId",
                table: "NoteEntities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Act",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActDateOfCreation = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    DateOfWorkCompletion = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Act", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Act_OrganizationEntities_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "OrganizationEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NoteEntities_ActId",
                table: "NoteEntities",
                column: "ActId");

            migrationBuilder.CreateIndex(
                name: "IX_Act_OrganizationId",
                table: "Act",
                column: "OrganizationId");

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

            migrationBuilder.DropTable(
                name: "Act");

            migrationBuilder.DropIndex(
                name: "IX_NoteEntities_ActId",
                table: "NoteEntities");

            migrationBuilder.DropColumn(
                name: "ActId",
                table: "NoteEntities");
        }
    }
}
