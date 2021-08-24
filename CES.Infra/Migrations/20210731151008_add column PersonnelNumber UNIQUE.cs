using Microsoft.EntityFrameworkCore.Migrations;

namespace CES.Infra.Migrations
{
    public partial class addcolumnPersonnelNumberUNIQUE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Employees_PersonnelNumber",
                table: "Employees",
                column: "PersonnelNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employees_PersonnelNumber",
                table: "Employees");
        }
    }
}
