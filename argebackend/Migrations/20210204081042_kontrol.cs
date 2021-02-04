using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace argebackend.Migrations
{
    public partial class kontrol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "kontrols",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    basvuruId = table.Column<long>(type: "bigint", nullable: false),
                    atayanUserId = table.Column<long>(type: "bigint", nullable: false),
                    atananUserId = table.Column<long>(type: "bigint", nullable: false),
                    atamaTarih = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    kontrolDurum = table.Column<string>(type: "text", nullable: true),
                    kurumUstYazi = table.Column<string>(type: "text", nullable: true),
                    dilekceBasvurusuUygunmu = table.Column<string>(type: "text", nullable: true),
                    arastirmaBaslik = table.Column<string>(type: "text", nullable: true),
                    arastirmaStatu = table.Column<string>(type: "text", nullable: true),
                    arastirmaci = table.Column<string>(type: "text", nullable: true),
                    danisman = table.Column<string>(type: "text", nullable: true),
                    kurum = table.Column<string>(type: "text", nullable: true),
                    arastirmaAmac = table.Column<string>(type: "text", nullable: true),
                    arastirmaTuru = table.Column<string>(type: "text", nullable: true),
                    arastirmaYeri = table.Column<string>(type: "text", nullable: true),
                    arastirmaEvreni = table.Column<string>(type: "text", nullable: true),
                    arastirmaHipotez = table.Column<string>(type: "text", nullable: true),
                    arastirmaYontem = table.Column<string>(type: "text", nullable: true),
                    arastirmaZamanAralik = table.Column<string>(type: "text", nullable: true),
                    girisimselUygulama = table.Column<string>(type: "text", nullable: true),
                    prospektifmi = table.Column<string>(type: "text", nullable: true),
                    arastirmaBilimselYararAciklanmismi = table.Column<string>(type: "text", nullable: true),
                    anketSorulariUygunmu = table.Column<string>(type: "text", nullable: true),
                    onizinformvarmi = table.Column<string>(type: "text", nullable: true),
                    basvuruformvarmi = table.Column<string>(type: "text", nullable: true),
                    etikkurulvarmi = table.Column<string>(type: "text", nullable: true),
                    bakanlikOnayvarmi = table.Column<string>(type: "text", nullable: true),
                    butceFormvarmi = table.Column<string>(type: "text", nullable: true),
                    ozgecmisvarmi = table.Column<string>(type: "text", nullable: true),
                    kullanilacakevraklarvarmi = table.Column<string>(type: "text", nullable: true),
                    ucedetLitaratur = table.Column<string>(type: "text", nullable: true),
                    gorusler = table.Column<string>(type: "text", nullable: true),
                    kontrolTarih = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<long>(type: "bigint", nullable: false),
                    ModifierId = table.Column<long>(type: "bigint", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ModifyDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    HVersion = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kontrols", x => x.Id);
                    table.ForeignKey(
                        name: "FK_kontrols_AspNetUsers_atananUserId",
                        column: x => x.atananUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_kontrols_AspNetUsers_atayanUserId",
                        column: x => x.atayanUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_kontrols_Basvurus_basvuruId",
                        column: x => x.basvuruId,
                        principalTable: "Basvurus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_kontrols_atananUserId",
                table: "kontrols",
                column: "atananUserId");

            migrationBuilder.CreateIndex(
                name: "IX_kontrols_atayanUserId",
                table: "kontrols",
                column: "atayanUserId");

            migrationBuilder.CreateIndex(
                name: "IX_kontrols_basvuruId",
                table: "kontrols",
                column: "basvuruId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "kontrols");
        }
    }
}
