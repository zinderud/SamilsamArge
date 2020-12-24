using Microsoft.EntityFrameworkCore.Migrations;

namespace argebackend.Migrations
{
    public partial class basvuruid_delete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BasvuruTuruId",
                table: "Basvurus");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Basvurus",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Basvurus_UserId",
                table: "Basvurus",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Basvurus_AspNetUsers_UserId",
                table: "Basvurus",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Basvurus_AspNetUsers_UserId",
                table: "Basvurus");

            migrationBuilder.DropIndex(
                name: "IX_Basvurus_UserId",
                table: "Basvurus");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Basvurus");

            migrationBuilder.AddColumn<int>(
                name: "BasvuruTuruId",
                table: "Basvurus",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
