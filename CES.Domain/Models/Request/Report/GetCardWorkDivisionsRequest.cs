using CES.Domain.Handlers.Report;
using MediatR;

namespace CES.Domain.Models.Request.Report
{
    public class GetCardWorkDivisionsRequest : IRequest<List<Model>>
    {
        public int GarageNumber { get; set; }

         public DateTime? ReportPeriod { get; set; }
    }
}
