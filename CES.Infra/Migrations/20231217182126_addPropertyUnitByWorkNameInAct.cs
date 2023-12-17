using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class addPropertyUnitByWorkNameInAct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UnitId",
                table: "WorkNameInAct",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkNameInAct_UnitId",
                table: "WorkNameInAct",
                column: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkNameInAct_Units_UnitId",
                table: "WorkNameInAct",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkNameInAct_Units_UnitId",
                table: "WorkNameInAct");

            migrationBuilder.DropIndex(
                name: "IX_WorkNameInAct_UnitId",
                table: "WorkNameInAct");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "WorkNameInAct");
        }
    }
}
