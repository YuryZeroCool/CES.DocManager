using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class DeleteFuilUniqueValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FuelWorkCards_WorkDate",
                table: "FuelWorkCards");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_FuelWorkCards_WorkDate",
                table: "FuelWorkCards",
                column: "WorkDate",
                unique: true);
        }
    }
}
