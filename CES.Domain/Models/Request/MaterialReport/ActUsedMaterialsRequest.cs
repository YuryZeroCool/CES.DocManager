using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class ActUsedMaterialsRequest : IRequest<byte[]>
    {
        public int Month { get; set; }

        public int Year { get; set; }

        public string? Path { get; set; }
    }
}
