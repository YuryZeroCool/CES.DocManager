using CES.Domain.Models.Response.Men;
using MediatR;

namespace CES.Domain.Models.Request.Men
{
    public class GetNotesRequest : IRequest<List<GetNotesResponse>>
    {
        public string? Text { get; set; }

        public DateTime Min { get; set; }

        public DateTime Max { get; set; }
    }
}
