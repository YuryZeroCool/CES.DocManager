using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class MakeColumnPowerAccountNumberNotIsUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrganizationEntities_PayerAccountNumber",
                table: "OrganizationEntities");

            migrationBuilder.AlterColumn<string>(
                name: "PayerAccountNumber",
                table: "OrganizationEntities",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PayerAccountNumber",
                table: "OrganizationEntities",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEntities_PayerAccountNumber",
                table: "OrganizationEntities",
                column: "PayerAccountNumber",
                unique: true,
                filter: "[PayerAccountNumber] IS NOT NULL");
        }
    }
}
