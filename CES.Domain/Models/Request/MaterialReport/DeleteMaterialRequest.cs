using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class DeleteMaterialRequest : IRequest<int>
    {
        public int MaterialId { get; set; }
    }
}
