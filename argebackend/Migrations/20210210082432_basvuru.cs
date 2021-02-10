using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace argebackend.Migrations
{
    public partial class basvuru : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "basvuruBaslangicTarih",
                table: "Basvurus",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "basvuruBitisTarih",
                table: "Basvurus",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "basvuruBaslangicTarih",
                table: "Basvurus");

            migrationBuilder.DropColumn(
                name: "basvuruBitisTarih",
                table: "Basvurus");
        }
    }
}
