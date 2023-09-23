using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddСolumnЬetersToTableNoteEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActTypeId",
                table: "PricesOfWorkInAct",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Meters",
                table: "NoteEntities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PricesOfWorkInAct_ActTypeId",
                table: "PricesOfWorkInAct",
                column: "ActTypeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PricesOfWorkInAct_ActTypes_ActTypeId",
                table: "PricesOfWorkInAct",
                column: "ActTypeId",
                principalTable: "ActTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PricesOfWorkInAct_ActTypes_ActTypeId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropIndex(
                name: "IX_PricesOfWorkInAct_ActTypeId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropColumn(
                name: "ActTypeId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropColumn(
                name: "Meters",
                table: "NoteEntities");
        }
    }
}
