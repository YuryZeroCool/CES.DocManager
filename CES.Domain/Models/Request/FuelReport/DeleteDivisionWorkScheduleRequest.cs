using MediatR;

namespace CES.Domain.Models.Request.Report
{
    public class DeleteDivisionWorkScheduleRequest : IRequest<int>
    {
        public int IdDivison { get; set; }
    }
}
