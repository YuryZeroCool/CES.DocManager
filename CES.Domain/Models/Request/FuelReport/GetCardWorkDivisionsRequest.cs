using CES.Domain.Handlers.FuelReport;
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
