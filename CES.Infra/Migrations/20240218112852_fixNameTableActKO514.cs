using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class fixNameTableActKO514 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Act_ActTypes_ActTypeEntityId",
                table: "Act");

            migrationBuilder.DropForeignKey(
                name: "FK_Act_Employees_EmployeeId",
                table: "Act");

            migrationBuilder.DropForeignKey(
                name: "FK_Act_NumberPlateOfCar_NumberPlateOfCarId",
                table: "Act");

            migrationBuilder.DropForeignKey(
                name: "FK_Act_OrganizationEntities_OrganizationId",
                table: "Act");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Act",
                table: "Act");

            migrationBuilder.RenameTable(
                name: "Act",
                newName: "ActKO514");

            migrationBuilder.RenameIndex(
                name: "IX_Act_OrganizationId",
                table: "ActKO514",
                newName: "IX_ActKO514_OrganizationId");

            migrationBuilder.RenameIndex(
                name: "IX_Act_NumberPlateOfCarId",
                table: "ActKO514",
                newName: "IX_ActKO514_NumberPlateOfCarId");

            migrationBuilder.RenameIndex(
                name: "IX_Act_EmployeeId",
                table: "ActKO514",
                newName: "IX_ActKO514_EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Act_ActTypeEntityId",
                table: "ActKO514",
                newName: "IX_ActKO514_ActTypeEntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActKO514",
                table: "ActKO514",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActKO514_ActTypes_ActTypeEntityId",
                table: "ActKO514",
                column: "ActTypeEntityId",
                principalTable: "ActTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActKO514_Employees_EmployeeId",
                table: "ActKO514",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActKO514_NumberPlateOfCar_NumberPlateOfCarId",
                table: "ActKO514",
                column: "NumberPlateOfCarId",
                principalTable: "NumberPlateOfCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActKO514_OrganizationEntities_OrganizationId",
                table: "ActKO514",
                column: "OrganizationId",
                principalTable: "OrganizationEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActKO514_ActTypes_ActTypeEntityId",
                table: "ActKO514");

            migrationBuilder.DropForeignKey(
                name: "FK_ActKO514_Employees_EmployeeId",
                table: "ActKO514");

            migrationBuilder.DropForeignKey(
                name: "FK_ActKO514_NumberPlateOfCar_NumberPlateOfCarId",
                table: "ActKO514");

            migrationBuilder.DropForeignKey(
                name: "FK_ActKO514_OrganizationEntities_OrganizationId",
                table: "ActKO514");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActKO514",
                table: "ActKO514");

            migrationBuilder.RenameTable(
                name: "ActKO514",
                newName: "Act");

            migrationBuilder.RenameIndex(
                name: "IX_ActKO514_OrganizationId",
                table: "Act",
                newName: "IX_Act_OrganizationId");

            migrationBuilder.RenameIndex(
                name: "IX_ActKO514_NumberPlateOfCarId",
                table: "Act",
                newName: "IX_Act_NumberPlateOfCarId");

            migrationBuilder.RenameIndex(
                name: "IX_ActKO514_EmployeeId",
                table: "Act",
                newName: "IX_Act_EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_ActKO514_ActTypeEntityId",
                table: "Act",
                newName: "IX_Act_ActTypeEntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Act",
                table: "Act",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Act_ActTypes_ActTypeEntityId",
                table: "Act",
                column: "ActTypeEntityId",
                principalTable: "ActTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Act_Employees_EmployeeId",
                table: "Act",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Act_NumberPlateOfCar_NumberPlateOfCarId",
                table: "Act",
                column: "NumberPlateOfCarId",
                principalTable: "NumberPlateOfCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Act_OrganizationEntities_OrganizationId",
                table: "Act",
                column: "OrganizationId",
                principalTable: "OrganizationEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
