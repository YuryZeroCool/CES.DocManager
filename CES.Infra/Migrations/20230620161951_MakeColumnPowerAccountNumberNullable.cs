using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class MakeColumnPowerAccountNumberNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrganizationEntities_PayerAccountNumber",
                table: "OrganizationEntities");

            migrationBuilder.AlterColumn<string>(
                name: "PayerAccountNumber",
                table: "OrganizationEntities",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEntities_PayerAccountNumber",
                table: "OrganizationEntities",
                column: "PayerAccountNumber",
                unique: true,
                filter: "[PayerAccountNumber] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrganizationEntities_PayerAccountNumber",
                table: "OrganizationEntities");

            migrationBuilder.AlterColumn<string>(
                name: "PayerAccountNumber",
                table: "OrganizationEntities",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEntities_PayerAccountNumber",
                table: "OrganizationEntities",
                column: "PayerAccountNumber",
                unique: true);
        }
    }
}
