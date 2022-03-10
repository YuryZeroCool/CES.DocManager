using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace CES.DocManger.WebApi
{
    public class AboutModel : PageModel
    {
        private readonly ILogger _logger;

        public AboutModel(ILogger<AboutModel> logger)
        {
            _logger = logger;
        }
        public string Message { get; set; }

        public void OnGet()
        {
            Message = $"About page visited at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(Message);
        }
    }
}
