using MediatR;

namespace CES.Domain.Security.Roles
{
    public class AddRoleRequest : IRequest<string>
    {
        public string? Name { get; set; }
    }
}
