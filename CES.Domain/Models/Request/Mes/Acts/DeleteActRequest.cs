using MediatR;

namespace CES.Domain.Models.Request.Mes.Acts
{
    public class DeleteActRequest : IRequest<int>
    {
        public int Id { get; set; }
    }
}