using MediatR;

namespace CES.Domain.Models.Request.Men
{
    public class DeleteNoteRequest : IRequest <int>
    {
        public int Id { get; set; } 
    }
}
