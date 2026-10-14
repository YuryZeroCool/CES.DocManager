using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class DeleteUsedMaterialRequest : IRequest<int>
    {
        public int Id { get; set; }

        public string? NameParty { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }
    }
}
