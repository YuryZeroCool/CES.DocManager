using CES.Domain.Exception;
using CES.InfraSecurity.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace CES.Domain.Security.User.Logout
{
    public class LogoutHandler : IRequestHandler<LogoutRequest>
    {
        private readonly UserManager<UserEntity> _userMgr;

        public LogoutHandler(UserManager<UserEntity> userMgr)
        {
            _userMgr = userMgr;
        }

        public async Task<Unit> Handle(LogoutRequest request, CancellationToken cancellationToken)
        {
            var user = await _userMgr.FindByEmailAsync(request.EmailAddress);

            if (user == null) throw new RestException(HttpStatusCode.Unauthorized);

           var res = _userMgr.RemoveAuthenticationTokenAsync(user, "MyApp", "RefreshToken").Result;
            if(!res.Succeeded) throw new RestException(HttpStatusCode.NotFound);

            return await Task.FromResult(new Unit());
        }
    }
}
