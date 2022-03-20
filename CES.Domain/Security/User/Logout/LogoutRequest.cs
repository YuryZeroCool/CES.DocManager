using MediatR;

namespace CES.Domain.Security.User.Logout
{
    public class LogoutRequest : IRequest
    {
        public string EmailAddress { get; set; }

        public string AccessToken { get; set; }
    }
}
