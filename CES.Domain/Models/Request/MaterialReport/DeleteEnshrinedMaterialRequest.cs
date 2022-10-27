using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class DeleteEnshrinedMaterialRequest : IRequest<int>
    {
        public int MaterialId { get; set; }
    }
}
