using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace CES.Domain.Services
{
    public interface ICurrentUserRole
    {
        string GetRole();
    }

    public class CurrentUserRole : ICurrentUserRole
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserRole(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetRole()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var role = user?.FindFirst(ClaimTypes.Role)?.Value
                ?? user?.FindFirst("role")?.Value;

            if (string.IsNullOrWhiteSpace(role))
            {
                throw new System.Exception("Не удалось определить роль пользователя");
            }

            return role.ToLowerInvariant();
        }
    }
}
