using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class ActWriteSparesRequest : IRequest<object>
    {
        public int Date { get; set; }

        public string? Path { get; set; } 

    }
}
