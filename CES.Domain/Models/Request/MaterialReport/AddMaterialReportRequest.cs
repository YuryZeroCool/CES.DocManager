using MediatR;
using Microsoft.AspNetCore.Http;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class AddMaterialReportRequest : IRequest<Unit>
    {
        public IFormFile? File { get; set; }
    }
}
