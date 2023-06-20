using MediatR;

namespace CES.Domain.Models.Request.Mes
{
    public class DeleteNoteRequest : IRequest <int>
    {
        public int Id { get; set; } 
    }
}
