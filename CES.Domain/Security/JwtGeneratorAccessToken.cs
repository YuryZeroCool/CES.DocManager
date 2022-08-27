using CES.Domain.Interfaces;
using CES.InfraSecurity.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CES.Domain.Security
{
    public class JwtGeneratorAccessToken : IJwtGenerator
    {
        private readonly SymmetricSecurityKey _key;

        public JwtGeneratorAccessToken(IConfiguration config)
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

            var tokenDescriptor = new JwtSecurityToken
            (
                claims: claims,
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: credentials
            );
            //var tokenHandler = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
            //var token = tokenHandler.CreateToken(tokenDescriptor);

            return await Task.FromResult(new JwtSecurityTokenHandler().WriteToken(tokenDescriptor));
        }

        public bool ValidateToken(string tokenRefresh)
        {
            throw new NotImplementedException();
        }
    }
}
