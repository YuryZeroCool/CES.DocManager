using CES.Domain.Models.Response.Report;
using MediatR;

namespace CES.Domain.Models.Request.Report
{
    public class GetAllDivisionsWorkScheduleRequest: IRequest<List<GetAllDivisionsWorkScheduleResponse>>
    {
        public string? Period { get; set; } 
    }
}
