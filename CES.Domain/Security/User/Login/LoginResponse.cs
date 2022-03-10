namespace CES.Domain.Security.User.Login
{
    public class LoginResponse
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }

        public string Error { get; set; }
    }
}
