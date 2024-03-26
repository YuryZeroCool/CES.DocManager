using CES.Domain.Models.Response.Mes.Notes;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class GetSortedNotesRequest : IRequest<List<GetSortedNotesResponse>>
    {
        public string? Text { get; set; }

        public DateTime Min { get; set; }

        public DateTime Max { get; set; }
    }
}
