using System.Net;

namespace CES.Domain.Exception
{
    public class TokenException : System.Exception
    {
        public TokenException(HttpStatusCode code, object errors = null)
        {
            Code = code;
            Errors = errors;
        }
        public HttpStatusCode Code { get; }

        public object Errors { get; set; }
    }
}
