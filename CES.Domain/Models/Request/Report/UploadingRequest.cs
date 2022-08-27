using MediatR;
using Microsoft.AspNetCore.Http;

namespace CES.Domain.Models.Request.Report
{
    public class UploadingRequest : IRequest<int>
    {
        public IFormFile? Uploading { get; set; }
        public string? Path { get; set; }
    }
}
