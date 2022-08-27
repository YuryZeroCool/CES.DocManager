using CES.Domain.Interfaces;
using CES.InfraSecurity.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CES.Domain.Security
{
    public class JwtGeneratorRefreshToken : IJwtGenerator
    {
        private readonly SymmetricSecurityKey _key;

        public JwtGeneratorRefreshToken(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey:TOKEN_KEY"]));

        }
        public async Task<string> CreateTokenAsync(UserEntity userEntity, IList<string> roles)
        {
            var now = DateTime.UtcNow;

            var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var claims = new List<Claim>
            {
                new(ClaimTypes.Name,userEntity.DisplayName),

            };

            claims.AddRange(roles.Select(item => new Claim(ClaimTypes.Role, item)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = AuthOptions.ISSUER,
                Audience = AuthOptions.AUDIENCE,
                NotBefore = now,
                IssuedAt = now,
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = credentials,

            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return await Task.FromResult(tokenHandler.WriteToken(token));
        }

        public bool ValidateToken(string tokenRefresh)
        {
            if (tokenRefresh == null)
                return false;

            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                tokenHandler.ValidateToken(tokenRefresh, new TokenValidationParameters
                {

                    ValidateLifetime = true,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = _key,

                    ValidateIssuer = true,
                    ValidIssuer = AuthOptions.ISSUER,

                    ValidateAudience = true,
                    ValidAudience = AuthOptions.AUDIENCE,

                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
