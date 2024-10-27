using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class GetDefectiveSheetRequest : IRequest<string>
    {
        public int Id { get; set; }

        public string? Path { get; set; }
    }
}
