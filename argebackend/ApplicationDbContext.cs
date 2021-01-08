using Microsoft.EntityFrameworkCore;
using argebackend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Linq;

namespace argebackend
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, long>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
            ApplyMigrations(this);
        }
        public void ApplyMigrations(ApplicationDbContext context)
        {
            if (context.Database.GetPendingMigrations().Any())
            {
                context.Database.Migrate();
            }
        }


        public DbSet<Person> Persons { get; set; }

        public DbSet<Ozgecmis> ozgecmisis { get; set; }
        public DbSet<Basvuru> Basvurus { get; set; }
        public DbSet<BsvNo> BsvNos { get; set; }
        public DbSet<Timeline> timelines { get; set; }






    }
}