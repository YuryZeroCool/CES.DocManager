using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class addOneToManyOrganizationTypeLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrganizationTypeId",
                table: "OrganizationEntities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEntities_OrganizationTypeId",
                table: "OrganizationEntities",
                column: "OrganizationTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationEntities_OrganizationTypes_OrganizationTypeId",
                table: "OrganizationEntities",
                column: "OrganizationTypeId",
                principalTable: "OrganizationTypes",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationEntities_OrganizationTypes_OrganizationTypeId",
                table: "OrganizationEntities");

            migrationBuilder.DropIndex(
                name: "IX_OrganizationEntities_OrganizationTypeId",
                table: "OrganizationEntities");

            migrationBuilder.DropColumn(
                name: "OrganizationTypeId",
                table: "OrganizationEntities");
        }
    }
}
