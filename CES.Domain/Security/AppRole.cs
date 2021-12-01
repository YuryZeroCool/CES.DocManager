using Microsoft.AspNetCore.Identity;

namespace CES.DocManger.WebApi.Security
{
    public class AppRole : IdentityRole
    {
        public AppRole() : base() { }
        public AppRole(string name) : base(name) 
        { }
    }
}
