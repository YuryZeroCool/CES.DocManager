using Microsoft.IdentityModel.Tokens;

namespace CES.Domain.Security
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer"; // издатель токена

        public const string AUDIENCE = "MyAuthClient"; // потребитель токена

        public const int LIFETIME = 15; // время жизни токена - 1 минута
        public static bool CustomLifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            if (expires != null)
            {
                return DateTime.UtcNow < expires;
            }
            return false;
        }
    }
}
