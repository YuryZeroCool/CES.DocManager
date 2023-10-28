using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class addWorkPerformActEntityTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "WorkPerformsAct",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NameId = table.Column<int>(type: "int", nullable: false),
                    PriceId = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ActId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkPerformsAct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkPerformsAct_Act_ActId",
                        column: x => x.ActId,
                        principalTable: "Act",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkPerformsAct_PricesOfWorkInAct_PriceId",
                        column: x => x.PriceId,
                        principalTable: "PricesOfWorkInAct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkPerformsAct_WorkNameInAct_NameId",
                        column: x => x.NameId,
                        principalTable: "WorkNameInAct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkPerformsAct_ActId",
                table: "WorkPerformsAct",
                column: "ActId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkPerformsAct_NameId",
                table: "WorkPerformsAct",
                column: "NameId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkPerformsAct_PriceId",
                table: "WorkPerformsAct",
                column: "PriceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkPerformsAct");

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
    }
}
