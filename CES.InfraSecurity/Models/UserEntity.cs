using Microsoft.AspNetCore.Identity;

namespace CES.InfraSecurity.Models
{
    public class UserEntity : IdentityUser
    {
        public string? DisplayName { get; set; }
    }
}
