using MediatR;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class DeleteNotesWithoutActRequest : IRequest<int>
    {
        public int Id { get; set; }
    }
}
