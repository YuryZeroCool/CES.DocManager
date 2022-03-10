using MediatR;

namespace CES.Domain.Security.User.UpDateToken
{
    public class UpDateTokenRequest : IRequest<TokenPairResponse>
    {
        public string RefreshToken { get; set; }

        public string EmailAddress { get; set; }
    }
}
