using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CES.InfraSecurity.Models
{
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
