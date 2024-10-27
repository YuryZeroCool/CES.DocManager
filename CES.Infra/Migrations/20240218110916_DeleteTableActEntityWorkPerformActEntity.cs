using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class DeleteTableActEntityWorkPerformActEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActEntityWorkPerformActEntity");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActEntityWorkPerformActEntity",
                columns: table => new
                {
                    ActsId = table.Column<int>(type: "int", nullable: false),
                    WorkPerformActId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActEntityWorkPerformActEntity", x => new { x.ActsId, x.WorkPerformActId });
                    table.ForeignKey(
                        name: "FK_ActEntityWorkPerformActEntity_Act_ActsId",
                        column: x => x.ActsId,
                        principalTable: "Act",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActEntityWorkPerformActEntity_WorkPerformsAct_WorkPerformActId",
                        column: x => x.WorkPerformActId,
                        principalTable: "WorkPerformsAct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActEntityWorkPerformActEntity_WorkPerformActId",
                table: "ActEntityWorkPerformActEntity",
                column: "WorkPerformActId");
        }
    }
}
