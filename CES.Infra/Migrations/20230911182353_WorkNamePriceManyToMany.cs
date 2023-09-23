using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class WorkNamePriceManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PriceOfWorkInActEntityWorkNameInActEntity",
                columns: table => new
                {
                    PricesOfWorkInActId = table.Column<int>(type: "int", nullable: false),
                    WorksNamesInActEntityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriceOfWorkInActEntityWorkNameInActEntity", x => new { x.PricesOfWorkInActId, x.WorksNamesInActEntityId });
                    table.ForeignKey(
                        name: "FK_PriceOfWorkInActEntityWorkNameInActEntity_PricesOfWorkInAct_PricesOfWorkInActId",
                        column: x => x.PricesOfWorkInActId,
                        principalTable: "PricesOfWorkInAct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PriceOfWorkInActEntityWorkNameInActEntity_WorkNameInAct_WorksNamesInActEntityId",
                        column: x => x.WorksNamesInActEntityId,
                        principalTable: "WorkNameInAct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PriceOfWorkInActEntityWorkNameInActEntity_WorksNamesInActEntityId",
                table: "PriceOfWorkInActEntityWorkNameInActEntity",
                column: "WorksNamesInActEntityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PriceOfWorkInActEntityWorkNameInActEntity");
        }
    }
}
