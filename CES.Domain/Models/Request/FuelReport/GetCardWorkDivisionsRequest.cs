using CES.Domain.Handlers.Report;
using CES.Domain.Models.Response.Report;
using MediatR;

namespace CES.Domain.Models.Request.Report
{
    public class GetCardWorkDivisionsRequest : IRequest<GetCardWorkDivisionsResponse>
    {
        public int GarageNumber { get; set; }

         public string? ReportPeriod { get; set; }
    }
}
