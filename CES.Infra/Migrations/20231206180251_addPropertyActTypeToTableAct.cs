using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class addPropertyActTypeToTableAct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActTypeEntityId",
                table: "Act",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Act_ActTypeEntityId",
                table: "Act",
                column: "ActTypeEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Act_ActTypes_ActTypeEntityId",
                table: "Act",
                column: "ActTypeEntityId",
                principalTable: "ActTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Act_ActTypes_ActTypeEntityId",
                table: "Act");

            migrationBuilder.DropIndex(
                name: "IX_Act_ActTypeEntityId",
                table: "Act");

            migrationBuilder.DropColumn(
                name: "ActTypeEntityId",
                table: "Act");
        }
    }
}
