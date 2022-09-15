using CES.Domain.Models.Response.Report;
using MediatR;

namespace CES.Domain.Models.Request.Report
{
    public class CreateCardWorkDivisionDateRequest : IRequest<CreateCardWorkDivisionDateResponse>
    {
        public string? DivisionName { get; set; }

        public ICollection<string>? WorkDivisionDates { get; set; }
    }
}
