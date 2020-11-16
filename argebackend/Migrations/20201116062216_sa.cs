using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace argebackend.Migrations
{
    public partial class sa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Basvurus",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<long>(nullable: false),
                    ModifierId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifyDate = table.Column<DateTime>(nullable: false),
                    HVersion = table.Column<int>(nullable: false),
                    BasvuruNo = table.Column<long>(nullable: false),
                    Tarih = table.Column<DateTime>(nullable: false),
                    Durum = table.Column<string>(nullable: true),
                    DurumId = table.Column<int>(nullable: false),
                    BasvuruTuruId = table.Column<int>(nullable: false),
                    BasvuruTuru = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Basvurus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ozgecmisis",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<long>(nullable: false),
                    ModifierId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifyDate = table.Column<DateTime>(nullable: false),
                    HVersion = table.Column<int>(nullable: false),
                    Sorumlu = table.Column<bool>(nullable: false),
                    Ad = table.Column<string>(nullable: true),
                    Soyad = table.Column<string>(nullable: true),
                    DogumYeri = table.Column<string>(nullable: true),
                    DogumTarihi = table.Column<DateTime>(nullable: false),
                    YabanciDil = table.Column<string>(nullable: true),
                    Eposta = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ozgecmisis", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BasvuruForms",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<long>(nullable: false),
                    ModifierId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifyDate = table.Column<DateTime>(nullable: false),
                    HVersion = table.Column<int>(nullable: false),
                    FormNo = table.Column<long>(nullable: false),
                    Tarih = table.Column<DateTime>(nullable: false),
                    Detay = table.Column<string>(nullable: true),
                    BasvuruId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasvuruForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BasvuruForms_Basvurus_BasvuruId",
                        column: x => x.BasvuruId,
                        principalTable: "Basvurus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Arastirmas",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<long>(nullable: false),
                    ModifierId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifyDate = table.Column<DateTime>(nullable: false),
                    HVersion = table.Column<int>(nullable: false),
                    Tarih = table.Column<DateTime>(nullable: false),
                    Acıklama = table.Column<string>(nullable: true),
                    OzgecmisId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Arastirmas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Arastirmas_ozgecmisis_OzgecmisId",
                        column: x => x.OzgecmisId,
                        principalTable: "ozgecmisis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Deneyims",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<long>(nullable: false),
                    ModifierId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifyDate = table.Column<DateTime>(nullable: false),
                    HVersion = table.Column<int>(nullable: false),
                    Tarih = table.Column<DateTime>(nullable: false),
                    Acıklama = table.Column<string>(nullable: true),
                    OzgecmisId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deneyims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Deneyims_ozgecmisis_OzgecmisId",
                        column: x => x.OzgecmisId,
                        principalTable: "ozgecmisis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Egitims",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<long>(nullable: false),
                    ModifierId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifyDate = table.Column<DateTime>(nullable: false),
                    HVersion = table.Column<int>(nullable: false),
                    Tarih = table.Column<DateTime>(nullable: false),
                    Acıklama = table.Column<string>(nullable: true),
                    OzgecmisId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Egitims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Egitims_ozgecmisis_OzgecmisId",
                        column: x => x.OzgecmisId,
                        principalTable: "ozgecmisis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Unvans",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<long>(nullable: false),
                    ModifierId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifyDate = table.Column<DateTime>(nullable: false),
                    HVersion = table.Column<int>(nullable: false),
                    Tarih = table.Column<DateTime>(nullable: false),
                    Acıklama = table.Column<string>(nullable: true),
                    OzgecmisId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Unvans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Unvans_ozgecmisis_OzgecmisId",
                        column: x => x.OzgecmisId,
                        principalTable: "ozgecmisis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Arastirmas_OzgecmisId",
                table: "Arastirmas",
                column: "OzgecmisId");

            migrationBuilder.CreateIndex(
                name: "IX_BasvuruForms_BasvuruId",
                table: "BasvuruForms",
                column: "BasvuruId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Deneyims_OzgecmisId",
                table: "Deneyims",
                column: "OzgecmisId");

            migrationBuilder.CreateIndex(
                name: "IX_Egitims_OzgecmisId",
                table: "Egitims",
                column: "OzgecmisId");

            migrationBuilder.CreateIndex(
                name: "IX_Unvans_OzgecmisId",
                table: "Unvans",
                column: "OzgecmisId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Arastirmas");

            migrationBuilder.DropTable(
                name: "BasvuruForms");

            migrationBuilder.DropTable(
                name: "Deneyims");

            migrationBuilder.DropTable(
                name: "Egitims");

            migrationBuilder.DropTable(
                name: "Unvans");

            migrationBuilder.DropTable(
                name: "Basvurus");

            migrationBuilder.DropTable(
                name: "ozgecmisis");
        }
    }
}
