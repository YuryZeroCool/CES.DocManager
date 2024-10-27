using CES.Domain.Models.Response.Mes.Notes;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class NotesWithoutActRequest : IRequest<IEnumerable<NotesWithoutActResponse>>
    {
        public DateTime Min { get; set; }

        public DateTime Max { get; set; }

        public string? Filter { get; set; } = "";

        public string SearchValue { get; set; } = string.Empty;

        public int Page{get;set; }

        public int Limit { get; set; }
    }
}
