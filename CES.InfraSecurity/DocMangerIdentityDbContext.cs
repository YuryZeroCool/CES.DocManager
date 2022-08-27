using CES.InfraSecurity.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CES.InfraSecurity
{

    //dotnet ef migrations add InitialCreate --context BlogContext --output-dir Migrations/SqlServerMigrations
    //Add-Migration  MaterialReport  -context DocMangerIdentityDbContext
    //  update-database -Context DocMangerIdentityDbContext

    public class DocMangerIdentityDbContext : IdentityDbContext<UserEntity, AppRoleEntity, string>
    {
        public DocMangerIdentityDbContext(DbContextOptions<DocMangerIdentityDbContext> options)
            : base(options)
        {
            //Database.EnsureCreated();
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        //{
        //    dbContextOptionsBuilder.LogTo(Console.WriteLine);
        //    dbContextOptionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("CONNECTION_STRING"));
        //    //dbContextOptionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["CONNECTION_STRING"].ConnectionString);
        //}
    }
}

