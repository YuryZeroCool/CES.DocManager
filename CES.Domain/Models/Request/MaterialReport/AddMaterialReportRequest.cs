using MediatR;
using Microsoft.AspNetCore.Http;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class AddMaterialReportRequest : IRequest
    {
        public IFormFile? File { get; set; }
    }
}
