using MediatR;

namespace CES.Domain.Security.Logout
{
    public class LogoutRequest : IRequest
    {
        public string? EmailAddress { get; set; }

        //public string AccessToken { get; set; }

        // public string RefreshToken { get; set; }
    }
}
