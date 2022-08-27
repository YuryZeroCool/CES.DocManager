using Microsoft.AspNetCore.Identity;

namespace CES.InfraSecurity.Models
{
    public class AppRoleEntity : IdentityRole
    {
        public AppRoleEntity() : base() { }
        public AppRoleEntity(string name) : base(name)
        { }
    }
}
