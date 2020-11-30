using Microsoft.EntityFrameworkCore.Migrations;

namespace argebackend.Migrations
{
    public partial class sa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Arastirmas_ozgecmisis_OzgecmisId",
                table: "Arastirmas");

            migrationBuilder.DropForeignKey(
                name: "FK_Deneyims_ozgecmisis_OzgecmisId",
                table: "Deneyims");

            migrationBuilder.DropForeignKey(
                name: "FK_Egitims_ozgecmisis_OzgecmisId",
                table: "Egitims");

            migrationBuilder.DropForeignKey(
                name: "FK_Unvans_ozgecmisis_OzgecmisId",
                table: "Unvans");

            migrationBuilder.RenameColumn(
                name: "acıklama",
                table: "Unvans",
                newName: "aciklama");

            migrationBuilder.RenameColumn(
                name: "OzgecmisId",
                table: "Unvans",
                newName: "OzgecmisID");

            migrationBuilder.RenameIndex(
                name: "IX_Unvans_OzgecmisId",
                table: "Unvans",
                newName: "IX_Unvans_OzgecmisID");

            migrationBuilder.RenameColumn(
                name: "acıklama",
                table: "Egitims",
                newName: "aciklama");

            migrationBuilder.RenameColumn(
                name: "OzgecmisId",
                table: "Egitims",
                newName: "OzgecmisID");

            migrationBuilder.RenameIndex(
                name: "IX_Egitims_OzgecmisId",
                table: "Egitims",
                newName: "IX_Egitims_OzgecmisID");

            migrationBuilder.RenameColumn(
                name: "acıklama",
                table: "Deneyims",
                newName: "aciklama");

            migrationBuilder.RenameColumn(
                name: "OzgecmisId",
                table: "Deneyims",
                newName: "OzgecmisID");

            migrationBuilder.RenameIndex(
                name: "IX_Deneyims_OzgecmisId",
                table: "Deneyims",
                newName: "IX_Deneyims_OzgecmisID");

            migrationBuilder.RenameColumn(
                name: "acıklama",
                table: "Arastirmas",
                newName: "aciklama");

            migrationBuilder.RenameColumn(
                name: "OzgecmisId",
                table: "Arastirmas",
                newName: "OzgecmisID");

            migrationBuilder.RenameIndex(
                name: "IX_Arastirmas_OzgecmisId",
                table: "Arastirmas",
                newName: "IX_Arastirmas_OzgecmisID");

            migrationBuilder.AlterColumn<long>(
                name: "OzgecmisID",
                table: "Unvans",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "OzgecmisID",
                table: "Egitims",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "OzgecmisID",
                table: "Deneyims",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "OzgecmisID",
                table: "Arastirmas",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Arastirmas_ozgecmisis_OzgecmisID",
                table: "Arastirmas",
                column: "OzgecmisID",
                principalTable: "ozgecmisis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Deneyims_ozgecmisis_OzgecmisID",
                table: "Deneyims",
                column: "OzgecmisID",
                principalTable: "ozgecmisis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Egitims_ozgecmisis_OzgecmisID",
                table: "Egitims",
                column: "OzgecmisID",
                principalTable: "ozgecmisis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Unvans_ozgecmisis_OzgecmisID",
                table: "Unvans",
                column: "OzgecmisID",
                principalTable: "ozgecmisis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Arastirmas_ozgecmisis_OzgecmisID",
                table: "Arastirmas");

            migrationBuilder.DropForeignKey(
                name: "FK_Deneyims_ozgecmisis_OzgecmisID",
                table: "Deneyims");

            migrationBuilder.DropForeignKey(
                name: "FK_Egitims_ozgecmisis_OzgecmisID",
                table: "Egitims");

            migrationBuilder.DropForeignKey(
                name: "FK_Unvans_ozgecmisis_OzgecmisID",
                table: "Unvans");

            migrationBuilder.RenameColumn(
                name: "aciklama",
                table: "Unvans",
                newName: "acıklama");

            migrationBuilder.RenameColumn(
                name: "OzgecmisID",
                table: "Unvans",
                newName: "OzgecmisId");

            migrationBuilder.RenameIndex(
                name: "IX_Unvans_OzgecmisID",
                table: "Unvans",
                newName: "IX_Unvans_OzgecmisId");

            migrationBuilder.RenameColumn(
                name: "aciklama",
                table: "Egitims",
                newName: "acıklama");

            migrationBuilder.RenameColumn(
                name: "OzgecmisID",
                table: "Egitims",
                newName: "OzgecmisId");

            migrationBuilder.RenameIndex(
                name: "IX_Egitims_OzgecmisID",
                table: "Egitims",
                newName: "IX_Egitims_OzgecmisId");

            migrationBuilder.RenameColumn(
                name: "aciklama",
                table: "Deneyims",
                newName: "acıklama");

            migrationBuilder.RenameColumn(
                name: "OzgecmisID",
                table: "Deneyims",
                newName: "OzgecmisId");

            migrationBuilder.RenameIndex(
                name: "IX_Deneyims_OzgecmisID",
                table: "Deneyims",
                newName: "IX_Deneyims_OzgecmisId");

            migrationBuilder.RenameColumn(
                name: "aciklama",
                table: "Arastirmas",
                newName: "acıklama");

            migrationBuilder.RenameColumn(
                name: "OzgecmisID",
                table: "Arastirmas",
                newName: "OzgecmisId");

            migrationBuilder.RenameIndex(
                name: "IX_Arastirmas_OzgecmisID",
                table: "Arastirmas",
                newName: "IX_Arastirmas_OzgecmisId");

            migrationBuilder.AlterColumn<long>(
                name: "OzgecmisId",
                table: "Unvans",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "OzgecmisId",
                table: "Egitims",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "OzgecmisId",
                table: "Deneyims",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "OzgecmisId",
                table: "Arastirmas",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddForeignKey(
                name: "FK_Arastirmas_ozgecmisis_OzgecmisId",
                table: "Arastirmas",
                column: "OzgecmisId",
                principalTable: "ozgecmisis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Deneyims_ozgecmisis_OzgecmisId",
                table: "Deneyims",
                column: "OzgecmisId",
                principalTable: "ozgecmisis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Egitims_ozgecmisis_OzgecmisId",
                table: "Egitims",
                column: "OzgecmisId",
                principalTable: "ozgecmisis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Unvans_ozgecmisis_OzgecmisId",
                table: "Unvans",
                column: "OzgecmisId",
                principalTable: "ozgecmisis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
