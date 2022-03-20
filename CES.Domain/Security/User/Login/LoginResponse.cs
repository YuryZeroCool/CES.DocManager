namespace CES.Domain.Security.User.Login
{
    public class LoginResponse
    {
        public virtual string UserName { get; set; }

        public virtual string Email { get; set; }

        public virtual string AccessToken { get; set; }

        public virtual string RefreshToken { get; set; }
    }
}
