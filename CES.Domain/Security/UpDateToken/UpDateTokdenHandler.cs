using CES.Domain.Exception;
using CES.Domain.Interfaces;
using CES.InfraSecurity.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net;

namespace CES.Domain.Security.UpDateToken
{
    public class UpDateTokdenHandler : IRequestHandler<UpDateTokenRequest, TokenPairResponse>
    {
        private readonly IJwtGenerator _jwtGenerator;
        private readonly IJwtGenerator _refreshToken;
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly UserManager<UserEntity> _userMgr;

        public UpDateTokdenHandler(UserManager<UserEntity> userMgr, SignInManager<UserEntity> signInManager,
           JwtGeneratorAccessToken jwtGenerator, JwtGeneratorRefreshToken refreshToken)
        {
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
            _userMgr = userMgr;
            _refreshToken = refreshToken;
        }

        public async Task<TokenPairResponse> Handle(UpDateTokenRequest request, CancellationToken cancellationToken)
        {
            if (_refreshToken.ValidateToken(request.RefreshToken))
            {
                var user = await _userMgr.FindByEmailAsync(request.EmailAddress);
                if (user == null) throw new TokenException(HttpStatusCode.Unauthorized, "Упс! Что-то пошло не так");

                var token = await _userMgr.GetAuthenticationTokenAsync(user, "MyApp", "RefreshToken");

                if (token != request.RefreshToken) throw new TokenException(HttpStatusCode.ServiceUnavailable, "Error Server Token");

                var userRole = await _userMgr.GetRolesAsync(user);

                if (userRole == null) throw new TokenException(HttpStatusCode.Unauthorized);

                var newToken = await _jwtGenerator.CreateTokenAsync(user, userRole);
                var refreshToken = await _refreshToken.CreateTokenAsync(user, userRole);

                var res = await _userMgr.SetAuthenticationTokenAsync(user, "MyApp", "RefreshToken", refreshToken);

                if (res == null) throw new System.Exception("Server Error");

                var refresh = await _userMgr.GetAuthenticationTokenAsync(user, "MyApp", "RefreshToken");


                return new TokenPairResponse() { AccessToken = newToken, RefreshToken = refresh };
            }
            else
            {
                throw new TokenException(HttpStatusCode.Unauthorized, "IsTokeninvalid");
            }
        }
    }
}
