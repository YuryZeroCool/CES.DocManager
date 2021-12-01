namespace CES.DocManger.WebApi.Security
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer"; // издатель токена

        public const string AUDIENCE = "MyAuthClient"; // потребитель токена

        public const int LIFETIME = 1; // время жизни токена - 1 минута
    }
}
