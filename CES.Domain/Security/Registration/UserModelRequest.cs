using MediatR;

namespace CES.Domain.Security.Registration
{
    public class UserModelRequest : IRequest<string>
    {
        public string? UserName { get; set; }

        public string? PhoneNumber { get; set; }

        public string? EmailAddress { get; set; }

        public string? Password { get; set; }

        public string? RoleName { get; set; }
    }
}
