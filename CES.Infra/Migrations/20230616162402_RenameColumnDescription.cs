using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class RenameColumnDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "NoteEntities",
                newName: "Comment");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "NoteEntities",
                newName: "Description");
        }
    }
}
