using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class DeleteTablePricesOfWorkInAct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkPerformsAct_PricesOfWorkInAct_PriceId",
                table: "WorkPerformsAct");

            migrationBuilder.DropTable(
                name: "PricesOfWorkInAct");

            migrationBuilder.DropIndex(
                name: "IX_WorkPerformsAct_PriceId",
                table: "WorkPerformsAct");

            migrationBuilder.DropColumn(
                name: "PriceId",
                table: "WorkPerformsAct");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PriceId",
                table: "WorkPerformsAct",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PricesOfWorkInAct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PricesOfWorkInAct", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkPerformsAct_PriceId",
                table: "WorkPerformsAct",
                column: "PriceId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkPerformsAct_PricesOfWorkInAct_PriceId",
                table: "WorkPerformsAct",
                column: "PriceId",
                principalTable: "PricesOfWorkInAct",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
