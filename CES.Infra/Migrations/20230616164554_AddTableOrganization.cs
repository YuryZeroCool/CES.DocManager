using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddTableOrganization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrganizationEntities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PayerAccountNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationEntities", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEntities_Name",
                table: "OrganizationEntities",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEntities_PayerAccountNumber",
                table: "OrganizationEntities",
                column: "PayerAccountNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrganizationEntities");
        }
    }
}
