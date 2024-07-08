using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Entitys;

namespace WebApplication1.Data
{
    public class DbContext_App : IdentityDbContext
    {
        public DbContext_App(DbContextOptions<DbContext_App> options) : base(options)
        {
        }

        public DbSet<User_Application> User_Applications { get; set; }
        public DbSet<Messages> Messages { get; set; }
        public DbSet<Friends> Friends { get; set; }

    }
}
