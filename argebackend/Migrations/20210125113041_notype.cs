using Microsoft.EntityFrameworkCore.Migrations;

namespace argebackend.Migrations
{
    public partial class notype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "notType",
                table: "timelines",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "notType",
                table: "timelines");
        }
    }
}
