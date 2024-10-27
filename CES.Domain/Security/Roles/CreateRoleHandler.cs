using CES.InfraSecurity.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CES.Domain.Security.Roles
{
    public class CreateRoleHandler : IRequestHandler<AddRoleRequest, string>
    {
        private readonly RoleManager<AppRoleEntity> _roleMgr;

        public CreateRoleHandler(RoleManager<AppRoleEntity> roleMgr)
        {
            _roleMgr = roleMgr;
        }

        public async Task<string> Handle(AddRoleRequest request, CancellationToken cancellationToken)
        {
            var role = _roleMgr.FindByNameAsync(request.Name).Result;

            if (role == null)
            {
                await _roleMgr.CreateAsync(new AppRoleEntity { Name = request.Name });

            }
            return "Ok";
        }
    }
}
