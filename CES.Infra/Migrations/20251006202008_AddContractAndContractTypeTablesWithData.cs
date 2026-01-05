using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CES.Infra.Migrations
{
    public partial class AddContractAndContractTypeTablesWithData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Создаем таблицу ContractTypes
            migrationBuilder.CreateTable(
                name: "ContractTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractTypes", x => x.Id);
                });

            // 2. Создаем таблицу Contracts
            migrationBuilder.CreateTable(
                name: "Contracts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartDateOfWork = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDateOfWork = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ContractNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContractTypeId = table.Column<int>(type: "int", nullable: true),
                    OrganizationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contracts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contracts_ContractTypes_ContractTypeId",
                        column: x => x.ContractTypeId,
                        principalTable: "ContractTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Contracts_OrganizationEntities_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "OrganizationEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            // 3. Добавляем колонку ContractId в таблицу Act
            migrationBuilder.AddColumn<int>(
                name: "ContractId",
                table: "Act",
                type: "int",
                nullable: true);

            // 4. Создаем индексы для новых колонок
            migrationBuilder.CreateIndex(
                name: "IX_Contracts_ContractTypeId",
                table: "Contracts",
                column: "ContractTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_OrganizationId",
                table: "Contracts",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Act_ContractId",
                table: "Act",
                column: "ContractId");

            // 5. Добавляем внешний ключ для ContractId
            migrationBuilder.AddForeignKey(
                name: "FK_Act_Contracts_ContractId",
                table: "Act",
                column: "ContractId",
                principalTable: "Contracts",
                principalColumn: "Id");

            // 6. Заполняем таблицу типов договоров базовыми значениями
            migrationBuilder.Sql(@"
                INSERT INTO ContractTypes (Name) VALUES
                ('Разовый'),
                ('Годовой'),
                ('Иной')
            ");

            // 7. ПЕРЕНОСИМ ДАННЫЕ: Создаем один договор для каждой организации со всеми её актами
            migrationBuilder.Sql(@"
                INSERT INTO Contracts (CreationDate, StartDateOfWork, EndDateOfWork, ContractNumber, ContractTypeId, OrganizationId)
                SELECT DISTINCT
                    MIN(ActDateOfCreation) as CreationDate,
                    NULL as StartDateOfWork,
                    NULL as EndDateOfWork,
                    'Б/Н' as ContractNumber,
                    3 as ContractTypeId,
                    OrganizationId
                FROM Act
                GROUP BY OrganizationId
            ");

            // 8. Обновляем таблицу Act, связывая ВСЕ акты организации с ЕДИНСТВЕННЫМ договором этой организации
            migrationBuilder.Sql(@"
                UPDATE Act
                SET ContractId = c.Id
                FROM Act a
                INNER JOIN Contracts c ON a.OrganizationId = c.OrganizationId
                WHERE a.OrganizationId = c.OrganizationId
            ");

            // 9. Удаляем индекс ContractId перед изменением колонки
            migrationBuilder.DropIndex(
                name: "IX_Act_ContractId",
                table: "Act");

            // 10. Делаем ContractId обязательным (NOT NULL)
            migrationBuilder.AlterColumn<int>(
                name: "ContractId",
                table: "Act",
                type: "int",
                nullable: false,
                defaultValue: 0);

            // 11. Восстанавливаем индекс ContractId
            migrationBuilder.CreateIndex(
                name: "IX_Act_ContractId",
                table: "Act",
                column: "ContractId");

            // 12. Удаляем старый внешний ключ OrganizationId
            migrationBuilder.DropForeignKey(
                name: "FK_Act_OrganizationEntities_OrganizationId",
                table: "Act");

            // 13. Удаляем индекс для OrganizationId
            migrationBuilder.DropIndex(
                name: "IX_Act_OrganizationId",
                table: "Act");

            // 14. Удаляем колонку OrganizationId из таблицы Act
            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Act");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Восстанавливаем структуру в обратном порядке

            // 1. Добавляем обратно колонку OrganizationId
            migrationBuilder.AddColumn<int>(
                name: "OrganizationId",
                table: "Act",
                type: "int",
                nullable: false,
                defaultValue: 0);

            // 2. Восстанавливаем данные из Contracts в Act
            migrationBuilder.Sql(@"
                UPDATE Act
                SET OrganizationId = c.OrganizationId
                FROM Act a
                INNER JOIN Contracts c ON a.ContractId = c.Id
                WHERE a.ContractId = c.Id
            ");

            // 3. Создаем индекс для OrganizationId
            migrationBuilder.CreateIndex(
                name: "IX_Act_OrganizationId",
                table: "Act",
                column: "OrganizationId");

            // 4. Восстанавливаем внешний ключ OrganizationId
            migrationBuilder.AddForeignKey(
                name: "FK_Act_OrganizationEntities_OrganizationId",
                table: "Act",
                column: "OrganizationId",
                principalTable: "OrganizationEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            // 5. Удаляем внешний ключ ContractId
            migrationBuilder.DropForeignKey(
                name: "FK_Act_Contracts_ContractId",
                table: "Act");

            // 6. Удаляем индекс ContractId
            migrationBuilder.DropIndex(
                name: "IX_Act_ContractId",
                table: "Act");

            // 7. Удаляем колонку ContractId
            migrationBuilder.DropColumn(
                name: "ContractId",
                table: "Act");

            // 8. Удаляем таблицу Contracts
            migrationBuilder.DropTable(
                name: "Contracts");

            // 9. Удаляем таблицу ContractTypes
            migrationBuilder.DropTable(
                name: "ContractTypes");
        }
    }
}

