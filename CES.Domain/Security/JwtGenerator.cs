using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;

namespace CES.DocManger.WebApi.Security
{
    public class JwtGenerator
    {
        private readonly SymmetricSecurityKey _key;

        public JwtGenerator(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey:TOKEN_KEY"]));
        }

        public string CreateToken()
        {
            var claim = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType,"del24@mail.ru"),
                new Claim(ClaimsIdentity.DefaultNameClaimType,"admin")
            };
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: DateTime.Now,
                claims: claim,
                expires: null,
                signingCredentials: new SigningCredentials(_key, SecurityAlgorithms.HmacSha256)
                );
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }
    }
}
