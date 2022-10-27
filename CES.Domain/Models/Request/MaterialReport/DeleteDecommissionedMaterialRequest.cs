using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class DeleteDecommissionedMaterialRequest : IRequest<int>
    {
        public int Id { get; set; }
    }
}
