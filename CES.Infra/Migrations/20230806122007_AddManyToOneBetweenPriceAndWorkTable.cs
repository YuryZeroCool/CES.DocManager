using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddManyToOneBetweenPriceAndWorkTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WorkNameInActEntityId",
                table: "PricesOfWorkInAct",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PricesOfWorkInAct_WorkNameInActEntityId",
                table: "PricesOfWorkInAct",
                column: "WorkNameInActEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_PricesOfWorkInAct_WorkNameInAct_WorkNameInActEntityId",
                table: "PricesOfWorkInAct",
                column: "WorkNameInActEntityId",
                principalTable: "WorkNameInAct",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PricesOfWorkInAct_WorkNameInAct_WorkNameInActEntityId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropIndex(
                name: "IX_PricesOfWorkInAct_WorkNameInActEntityId",
                table: "PricesOfWorkInAct");

            migrationBuilder.DropColumn(
                name: "WorkNameInActEntityId",
                table: "PricesOfWorkInAct");
        }
    }
}
