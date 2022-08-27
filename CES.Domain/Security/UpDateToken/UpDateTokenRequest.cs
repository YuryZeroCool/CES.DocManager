using MediatR;

namespace CES.Domain.Security.UpDateToken
{
    public class UpDateTokenRequest : IRequest<TokenPairResponse>
    {
        public string? RefreshToken { get; set; }

        public string? EmailAddress { get; set; }
    }
}
