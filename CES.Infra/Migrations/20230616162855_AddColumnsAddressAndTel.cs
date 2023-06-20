using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddColumnsAddressAndTel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "NoteEntities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tel",
                table: "NoteEntities",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "NoteEntities");

            migrationBuilder.DropColumn(
                name: "Tel",
                table: "NoteEntities");
        }
    }
}
