using Microsoft.EntityFrameworkCore.Migrations;

namespace argebackend.Migrations
{
    public partial class tc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tc",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tc",
                table: "AspNetUsers");
        }
    }
}
