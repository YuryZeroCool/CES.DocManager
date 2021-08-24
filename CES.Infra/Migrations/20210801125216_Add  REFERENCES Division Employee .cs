using Microsoft.EntityFrameworkCore.Migrations;

namespace CES.Infra.Migrations
{
    public partial class AddREFERENCESDivisionEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DivisionNumberId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DivisionNumberId",
                table: "Employees",
                column: "DivisionNumberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Divisions_DivisionNumberId",
                table: "Employees",
                column: "DivisionNumberId",
                principalTable: "Divisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Divisions_DivisionNumberId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_DivisionNumberId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DivisionNumberId",
                table: "Employees");
        }
    }
}
