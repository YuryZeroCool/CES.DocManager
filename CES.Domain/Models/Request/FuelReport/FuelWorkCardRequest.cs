using MediatR;
using Microsoft.AspNetCore.Http;

namespace CES.Domain.Models.Request.Report
{
    public class FuelWorkCardRequest : IRequest<int>
    {
        public IFormFile? FuelWorkCardFile { get; set; }
    }
}
