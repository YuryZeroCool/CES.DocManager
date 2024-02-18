using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class addPropertyEmployeeIdTableActEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Act",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Act_EmployeeId",
                table: "Act",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Act_Employees_EmployeeId",
                table: "Act",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Act_Employees_EmployeeId",
                table: "Act");

            migrationBuilder.DropIndex(
                name: "IX_Act_EmployeeId",
                table: "Act");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Act");
        }
    }
}
