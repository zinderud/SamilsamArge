using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace argebackend.Migrations
{
    public partial class timeline : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "timelines",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<long>(nullable: false),
                    ModifierId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifyDate = table.Column<DateTime>(nullable: false),
                    HVersion = table.Column<int>(nullable: false),
                    userId = table.Column<long>(nullable: false),
                    BasvuruId = table.Column<long>(nullable: false),
                    tarih = table.Column<DateTime>(nullable: false),
                    durum = table.Column<string>(nullable: true),
                    not = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_timelines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_timelines_Basvurus_BasvuruId",
                        column: x => x.BasvuruId,
                        principalTable: "Basvurus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_timelines_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_timelines_BasvuruId",
                table: "timelines",
                column: "BasvuruId");

            migrationBuilder.CreateIndex(
                name: "IX_timelines_userId",
                table: "timelines",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "timelines");
        }
    }
}
