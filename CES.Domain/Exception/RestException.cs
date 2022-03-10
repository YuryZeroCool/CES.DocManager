using System.Net;

namespace CES.Domain.Exception
{
    public class RestException : System.Exception
    {
        public RestException(HttpStatusCode code, object errors = null)
        {
            Code = code;
            Errors = errors;
        }

        public HttpStatusCode Code { get; set; }

        public object Errors { get; set; }
    }
}
