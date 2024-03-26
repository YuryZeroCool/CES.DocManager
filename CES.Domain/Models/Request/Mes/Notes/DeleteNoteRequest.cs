using MediatR;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class DeleteNoteRequest : IRequest<int>
    {
        public int Id { get; set; }
    }
}
