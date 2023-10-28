using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class DeletePriceOfWorkInActEntityWorkNameInActEntityTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActTypeEntityWorkNameInActEntity");

            migrationBuilder.DropTable(
                name: "PriceOfWorkInActEntityWorkNameInActEntity");

            migrationBuilder.AddColumn<int>(
                name: "ActTypeEntityId",
                table: "WorkNameInAct",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkNameInAct_ActTypeEntityId",
                table: "WorkNameInAct",
                column: "ActTypeEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkNameInAct_ActTypes_ActTypeEntityId",
                table: "WorkNameInAct",
                column: "ActTypeEntityId",
                principalTable: "ActTypes",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkNameInAct_ActTypes_ActTypeEntityId",
                table: "WorkNameInAct");

            migrationBuilder.DropIndex(
                name: "IX_WorkNameInAct_ActTypeEntityId",
                table: "WorkNameInAct");

            migrationBuilder.DropColumn(
                name: "ActTypeEntityId",
                table: "WorkNameInAct");

            migrationBuilder.CreateTable(
                name: "ActTypeEntityWorkNameInActEntity",
                columns: table => new
                {
                    ActTypesId = table.Column<int>(type: "int", nullable: false),
                    WorkNameInActEntitiesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActTypeEntityWorkNameInActEntity", x => new { x.ActTypesId, x.WorkNameInActEntitiesId });
                    table.ForeignKey(
                        name: "FK_ActTypeEntityWorkNameInActEntity_ActTypes_ActTypesId",
                        column: x => x.ActTypesId,
                        principalTable: "ActTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActTypeEntityWorkNameInActEntity_WorkNameInAct_WorkNameInActEntitiesId",
                        column: x => x.WorkNameInActEntitiesId,
                        principalTable: "WorkNameInAct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "IX_ActTypeEntityWorkNameInActEntity_WorkNameInActEntitiesId",
                table: "ActTypeEntityWorkNameInActEntity",
                column: "WorkNameInActEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_PriceOfWorkInActEntityWorkNameInActEntity_WorksNamesInActEntityId",
                table: "PriceOfWorkInActEntityWorkNameInActEntity",
                column: "WorksNamesInActEntityId");
        }
    }
}
