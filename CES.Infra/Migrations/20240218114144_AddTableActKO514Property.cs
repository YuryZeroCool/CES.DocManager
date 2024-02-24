using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddTableActKO514Property : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PipeDiameter100Id",
                table: "ActKO514",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PipeDiameter150Id",
                table: "ActKO514",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PipeDiameter200Id",
                table: "ActKO514",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PipeDiameter300Id",
                table: "ActKO514",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WaterRefillIdId",
                table: "ActKO514",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_PipeDiameter100Id",
                table: "ActKO514",
                column: "PipeDiameter100Id");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_PipeDiameter150Id",
                table: "ActKO514",
                column: "PipeDiameter150Id");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_PipeDiameter200Id",
                table: "ActKO514",
                column: "PipeDiameter200Id");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_PipeDiameter300Id",
                table: "ActKO514",
                column: "PipeDiameter300Id");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_WaterRefillIdId",
                table: "ActKO514",
                column: "WaterRefillIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_PipeDiameter100Id",
                table: "ActKO514",
                column: "PipeDiameter100Id",
                principalTable: "WorkPerformsAct",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_PipeDiameter150Id",
                table: "ActKO514",
                column: "PipeDiameter150Id",
                principalTable: "WorkPerformsAct",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_PipeDiameter200Id",
                table: "ActKO514",
                column: "PipeDiameter200Id",
                principalTable: "WorkPerformsAct",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_PipeDiameter300Id",
                table: "ActKO514",
                column: "PipeDiameter300Id",
                principalTable: "WorkPerformsAct",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_WaterRefillIdId",
                table: "ActKO514",
                column: "WaterRefillIdId",
                principalTable: "WorkPerformsAct",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_PipeDiameter100Id",
                table: "ActKO514");

            migrationBuilder.DropForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_PipeDiameter150Id",
                table: "ActKO514");

            migrationBuilder.DropForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_PipeDiameter200Id",
                table: "ActKO514");

            migrationBuilder.DropForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_PipeDiameter300Id",
                table: "ActKO514");

            migrationBuilder.DropForeignKey(
                name: "FK_ActKO514_WorkPerformsAct_WaterRefillIdId",
                table: "ActKO514");

            migrationBuilder.DropIndex(
                name: "IX_ActKO514_PipeDiameter100Id",
                table: "ActKO514");

            migrationBuilder.DropIndex(
                name: "IX_ActKO514_PipeDiameter150Id",
                table: "ActKO514");

            migrationBuilder.DropIndex(
                name: "IX_ActKO514_PipeDiameter200Id",
                table: "ActKO514");

            migrationBuilder.DropIndex(
                name: "IX_ActKO514_PipeDiameter300Id",
                table: "ActKO514");

            migrationBuilder.DropIndex(
                name: "IX_ActKO514_WaterRefillIdId",
                table: "ActKO514");

            migrationBuilder.DropColumn(
                name: "PipeDiameter100Id",
                table: "ActKO514");

            migrationBuilder.DropColumn(
                name: "PipeDiameter150Id",
                table: "ActKO514");

            migrationBuilder.DropColumn(
                name: "PipeDiameter200Id",
                table: "ActKO514");

            migrationBuilder.DropColumn(
                name: "PipeDiameter300Id",
                table: "ActKO514");

            migrationBuilder.DropColumn(
                name: "WaterRefillIdId",
                table: "ActKO514");
        }
    }
}
