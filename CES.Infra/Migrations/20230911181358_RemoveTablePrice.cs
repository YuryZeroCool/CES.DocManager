using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class RemoveTablePrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PricesOfWorkInAct_ActTypes_ActTypeId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropForeignKey(
                name: "FK_PricesOfWorkInAct_WorkNameInAct_WorkNameInActEntityId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropIndex(
                name: "IX_PricesOfWorkInAct_ActTypeId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropIndex(
                name: "IX_PricesOfWorkInAct_WorkNameInActEntityId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropColumn(
                name: "ActTypeId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropColumn(
                name: "WorkNameInActEntityId",
                table: "PricesOfWorkInAct");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActTypeId",
                table: "PricesOfWorkInAct",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WorkNameInActEntityId",
                table: "PricesOfWorkInAct",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PricesOfWorkInAct_ActTypeId",
                table: "PricesOfWorkInAct",
                column: "ActTypeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PricesOfWorkInAct_WorkNameInActEntityId",
                table: "PricesOfWorkInAct",
                column: "WorkNameInActEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_PricesOfWorkInAct_ActTypes_ActTypeId",
                table: "PricesOfWorkInAct",
                column: "ActTypeId",
                principalTable: "ActTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PricesOfWorkInAct_WorkNameInAct_WorkNameInActEntityId",
                table: "PricesOfWorkInAct",
                column: "WorkNameInActEntityId",
                principalTable: "WorkNameInAct",
                principalColumn: "Id");
        }
    }
}
