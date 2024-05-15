using CES.Domain.Exception;
using CES.InfraSecurity.Models;
using Microsoft.AspNetCore.Identity;
using System.Net;
using MediatR;

namespace CES.Domain.Security.Logout
{
    public class LogoutHandler : IRequestHandler<LogoutRequest>
    {
        private readonly UserManager<UserEntity> _userMgr;

        public LogoutHandler(UserManager<UserEntity> userMgr)
        {
            _userMgr = userMgr;
        }

        public async Task Handle(LogoutRequest request, CancellationToken cancellationToken)
        {
            var user = await _userMgr.FindByEmailAsync(request.EmailAddress);

            if (user == null) throw new RestException(HttpStatusCode.Unauthorized);

            var res = _userMgr.RemoveAuthenticationTokenAsync(user, "MyApp", "RefreshToken").Result;
            if (!res.Succeeded) throw new RestException(HttpStatusCode.NotFound);
        }
    }
}
