using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class ActTypeWorkNamwManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_ActTypeEntityWorkNameInActEntity_WorkNameInActEntitiesId",
                table: "ActTypeEntityWorkNameInActEntity",
                column: "WorkNameInActEntitiesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActTypeEntityWorkNameInActEntity");
        }
    }
}
