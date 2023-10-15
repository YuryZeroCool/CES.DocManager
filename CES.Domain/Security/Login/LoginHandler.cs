using CES.Domain.Exception;
using CES.Domain.Interfaces;
using CES.InfraSecurity.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net;

namespace CES.Domain.Security.Login
{
    public class LoginHandler : IRequestHandler<LoginRequest, LoginResponse>
    {
        private readonly JwtGeneratorAccessToken _jwtGenerator;

        private readonly JwtGeneratorRefreshToken _refreshToken;

        private readonly SignInManager<UserEntity> _signInManager;

        private readonly UserManager<UserEntity> _userMgr;

        public LoginHandler(UserManager<UserEntity> userMgr, SignInManager<UserEntity> signInManager,
            JwtGeneratorAccessToken jwtGenerator, JwtGeneratorRefreshToken refreshToken)
        {
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
            _userMgr = userMgr;
            _refreshToken = refreshToken;
        }

        public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await _userMgr.FindByEmailAsync(request.Email) ?? throw new RestException(HttpStatusCode.Unauthorized);
            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!result.Succeeded) throw new RestException(HttpStatusCode.Unauthorized);

            var userRole = await _userMgr.GetRolesAsync(user);

            var token = await _jwtGenerator.CreateTokenAsync(user, userRole);
            var refreshToken = await _refreshToken.CreateTokenAsync(user, userRole);

            var res = await _userMgr.SetAuthenticationTokenAsync(user, "MyApp", "RefreshToken", refreshToken) ?? throw new System.Exception("Server Error");
            var refresh = await _userMgr.GetAuthenticationTokenAsync(user, "MyApp", "RefreshToken");

            return new LoginResponse() { AccessToken = token, RefreshToken = refresh, Email = user.Email, UserName = user.UserName };
        }
    }
}
