using CES.Domain.Models.Response.Mes;
using MediatR;

namespace CES.Domain.Models.Request.Mes
{
    public class GetSortedNotesRequest : IRequest<List<GetSortedNotesResponse>>
    {
        public string? Text { get; set; }

        public DateTime Min { get; set; }

        public DateTime Max { get; set; }
    }
}
