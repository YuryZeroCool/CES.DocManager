using CES.InfraSecurity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CES.DocManger.WebApi.Security
{
    public static class ServiceCollection
    {
        public static async Task EnsureSeeeData(IServiceProvider provider, UserManager<IdentityUser> userMgr)
        {
            var roleMgr = provider.GetRequiredService<RoleManager<IdentityRole>>();
            Console.WriteLine(roleMgr);
            foreach (var roleName in RoleNames.AllRoles)
            {
                var role = roleMgr.FindByNameAsync(roleName).Result;

                if (role == null)
                {
                    var result = roleMgr.CreateAsync(new IdentityRole { Name = roleName }).Result;
                    if (!result.Succeeded) throw new Exception(result.Errors.First().Description);
                }
            }

            var adminResult = await userMgr.CreateAsync(DefaultUsers.Administrator, "User123!");
            var userResult = await userMgr.CreateAsync(DefaultUsers.User, "User123!");
            var moderatorResult = await userMgr.CreateAsync(DefaultUsers.Moderator, "User123!");

            if (adminResult.Succeeded || userResult.Succeeded || moderatorResult.Succeeded)
            {
                var admimUser = await userMgr.FindByEmailAsync(DefaultUsers.Administrator.Email);
                var commonUser = await userMgr.FindByEmailAsync(DefaultUsers.User.Email);
                var moderatorUser = await userMgr.FindByEmailAsync(DefaultUsers.Moderator.Email);

                await userMgr.AddToRoleAsync(admimUser, RoleNames.Administrator);
                await userMgr.AddToRoleAsync(commonUser, RoleNames.User);
                await userMgr.AddToRoleAsync(moderatorUser, RoleNames.Moderator);
            }
        }
    }

    public static class RoleNames
    {
        public const string Administrator = "Администратор";  
        public const string User = "Пользователь";
        public const string Moderator = "Модератор";

        public static IEnumerable<string> AllRoles
        {
            get
            {
                yield return Administrator;
                yield return User;
                yield return Moderator;
            }
        }
    }

    public static class DefaultUsers
    {
        public static readonly IdentityUser Administrator = new IdentityUser
        {
            Email = "Admin@test.ru",
            EmailConfirmed = true,
            UserName = "Admin@test.ru"
        };

        public static readonly IdentityUser Moderator = new IdentityUser
        {
            Email = "Moderator@test.ru",
            EmailConfirmed = true,
            UserName = "Moderator@test.ru",
        };

        public static readonly IdentityUser User = new IdentityUser
        {
            Email = "User@test.ru",
            EmailConfirmed = true,
            UserName = "User@test.ru"
        };

        public static IEnumerable<IdentityUser> AllUsers
        {
            get
            {
                yield return Administrator;
                yield return Moderator;
                yield return User;
            }
        }
    }
}
