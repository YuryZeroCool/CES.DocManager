using AutoMapper;
using CES.Domain.Interfaces;
using CES.InfraSecurity.Models;
using Microsoft.AspNetCore.Identity;
using System.Net;
using CES.Domain.Exception;
using MediatR;

namespace CES.Domain.Security.Registration
{
    public class RegistrationHandler : IRequestHandler<UserModelRequest, string>
    {

        private readonly UserManager<UserEntity> _userMgr;
        private readonly IMapper _mapper;
        private readonly RoleManager<AppRoleEntity> _roleMgr;
        private readonly IJwtGenerator _jwtGenerator;

        public RegistrationHandler(UserManager<UserEntity> userMgr, IMapper mapper, RoleManager<AppRoleEntity> roleMgr,
            JwtGeneratorAccessToken jwtGenerator)
        {
            _userMgr = userMgr;
            _mapper = mapper;
            _roleMgr = roleMgr;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<string> Handle(UserModelRequest request, CancellationToken cancellationToken)
        {
            var resRole = _roleMgr.FindByNameAsync(request.RoleName).Result;
            var resulEmail = _userMgr.FindByEmailAsync(request.EmailAddress).Result;

            if (resulEmail != null)
                throw new RestException(HttpStatusCode.BadRequest, "Такой address email существует");
            if (resRole == null) throw new RestException(HttpStatusCode.BadRequest, "Такой роли не существует в бд");

            var user = await _userMgr.CreateAsync(_mapper.Map<UserModelRequest, UserEntity>(request), request.Password);

            UserEntity resUser = null;
            IList<string> rolUser = null;

            if (user.Succeeded)
            {
                resUser = await _userMgr.FindByEmailAsync(request.EmailAddress);
                await _userMgr.AddToRoleAsync(resUser, resRole.Name);
                rolUser = await _userMgr.GetRolesAsync(resUser);
            }

            //_userMgr.GenerateUserTokenAsync
            return await _jwtGenerator.CreateTokenAsync(resUser, rolUser);
        }
    }
}
