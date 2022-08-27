using System.Net;

namespace CES.Domain.Exception
{
    public class RestException : System.Exception
    {
        public RestException(HttpStatusCode code, object? error = null)
        {
            Code = code;
            Error = error;
        }

        public HttpStatusCode Code { get; set; }

        public object? Error { get; set; }
    }
}
