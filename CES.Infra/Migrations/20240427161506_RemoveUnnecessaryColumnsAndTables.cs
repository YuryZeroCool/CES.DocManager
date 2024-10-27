using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class RemoveUnnecessaryColumnsAndTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActKO514");

            migrationBuilder.DropTable(
                name: "WorkPerformsAct");

            migrationBuilder.DropTable(
                name: "WorkNameInAct");

            migrationBuilder.CreateTable(
                name: "Act",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActDateOfCreation = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    DateOfWorkCompletion = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Vat = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    NumberPlateOfCarId = table.Column<int>(type: "int", nullable: false),
                    ActTypeEntityId = table.Column<int>(type: "int", nullable: false),
                    WorkPerformAct = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Act", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Act_ActTypes_ActTypeEntityId",
                        column: x => x.ActTypeEntityId,
                        principalTable: "ActTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Act_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Act_NumberPlateOfCar_NumberPlateOfCarId",
                        column: x => x.NumberPlateOfCarId,
                        principalTable: "NumberPlateOfCar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Act_OrganizationEntities_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "OrganizationEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Act_ActTypeEntityId",
                table: "Act",
                column: "ActTypeEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Act_EmployeeId",
                table: "Act",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Act_NumberPlateOfCarId",
                table: "Act",
                column: "NumberPlateOfCarId");

            migrationBuilder.CreateIndex(
                name: "IX_Act_OrganizationId",
                table: "Act",
                column: "OrganizationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Act");

            migrationBuilder.CreateTable(
                name: "WorkNameInAct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UnitId = table.Column<int>(type: "int", nullable: true),
                    DateOfCreation = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkNameInAct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkNameInAct_Units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Units",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkPerformsAct",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NameId = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkPerformsAct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkPerformsAct_WorkNameInAct_NameId",
                        column: x => x.NameId,
                        principalTable: "WorkNameInAct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActKO514",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActTypeEntityId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    NumberPlateOfCarId = table.Column<int>(type: "int", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    PipeDiameter100Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PipeDiameter150Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PipeDiameter200Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PipeDiameter300Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    WaterRefillIdId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActDateOfCreation = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    DateOfWorkCompletion = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Vat = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActKO514", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActKO514_ActTypes_ActTypeEntityId",
                        column: x => x.ActTypeEntityId,
                        principalTable: "ActTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActKO514_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActKO514_NumberPlateOfCar_NumberPlateOfCarId",
                        column: x => x.NumberPlateOfCarId,
                        principalTable: "NumberPlateOfCar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActKO514_OrganizationEntities_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "OrganizationEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActKO514_WorkPerformsAct_PipeDiameter100Id",
                        column: x => x.PipeDiameter100Id,
                        principalTable: "WorkPerformsAct",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActKO514_WorkPerformsAct_PipeDiameter150Id",
                        column: x => x.PipeDiameter150Id,
                        principalTable: "WorkPerformsAct",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActKO514_WorkPerformsAct_PipeDiameter200Id",
                        column: x => x.PipeDiameter200Id,
                        principalTable: "WorkPerformsAct",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActKO514_WorkPerformsAct_PipeDiameter300Id",
                        column: x => x.PipeDiameter300Id,
                        principalTable: "WorkPerformsAct",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActKO514_WorkPerformsAct_WaterRefillIdId",
                        column: x => x.WaterRefillIdId,
                        principalTable: "WorkPerformsAct",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_ActTypeEntityId",
                table: "ActKO514",
                column: "ActTypeEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_EmployeeId",
                table: "ActKO514",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_NumberPlateOfCarId",
                table: "ActKO514",
                column: "NumberPlateOfCarId");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_OrganizationId",
                table: "ActKO514",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_PipeDiameter100Id",
                table: "ActKO514",
                column: "PipeDiameter100Id");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_PipeDiameter150Id",
                table: "ActKO514",
                column: "PipeDiameter150Id");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_PipeDiameter200Id",
                table: "ActKO514",
                column: "PipeDiameter200Id");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_PipeDiameter300Id",
                table: "ActKO514",
                column: "PipeDiameter300Id");

            migrationBuilder.CreateIndex(
                name: "IX_ActKO514_WaterRefillIdId",
                table: "ActKO514",
                column: "WaterRefillIdId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkNameInAct_UnitId",
                table: "WorkNameInAct",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkPerformsAct_NameId",
                table: "WorkPerformsAct",
                column: "NameId");
        }
    }
}
