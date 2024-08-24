using System.Net;

namespace CES.DocManager.WebApi.Services
{
    public class ErrorResponse
    {
        public string ErrorMessage { get; set; }

        public ErrorResponse(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }
    }
}
