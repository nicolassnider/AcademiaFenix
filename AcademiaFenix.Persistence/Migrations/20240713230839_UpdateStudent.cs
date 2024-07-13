using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademiaFenix.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
    {
      // Add new columns with default values (same as before)
      migrationBuilder.AddColumn<string>(
        name: "CreatedBy",
        table: "Students",
        type: "nvarchar(max)",
        nullable: true,
        defaultValue: "");

      migrationBuilder.AddColumn<DateOnly>(
        name: "CreatedDate",
        table: "Students",
        type: "date",
        nullable: true,
        defaultValue: null);

      migrationBuilder.AddColumn<string>(
        name: "UpdatedBy",
        table: "Students",
        type: "nvarchar(max)",
        nullable: false,
        defaultValue: "");

      migrationBuilder.AddColumn<DateOnly>(
        name: "UpdatedDate",
        table: "Students",
        type: "date",
        nullable: false,
        defaultValue: new DateOnly(1, 1, 1));

      // Update existing Students (unchanged)
      migrationBuilder.Sql(@"
        UPDATE Students
        SET UpdatedBy = '',
            UpdatedDate = GETUTCDATE()
      ");
    }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Students");
        }
    }
}
