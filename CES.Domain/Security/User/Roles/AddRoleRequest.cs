using MediatR;

namespace CES.Domain.Security.User.Roles
{
    public class AddRoleRequest : IRequest<string>
    {
        public string Name { get; set; }
    }
}
