using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Report;
using CES.Domain.Services;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.FuelReport
{
    public class GetAllDivisionWorkScheduleHandler : IRequestHandler<GetAllDivisionsWorkScheduleRequest, List<GetAllDivisionsWorkScheduleResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly Date _date;
        public GetAllDivisionWorkScheduleHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            _date = new Date();
        }

        public async Task<List<GetAllDivisionsWorkScheduleResponse>> Handle(GetAllDivisionsWorkScheduleRequest request, CancellationToken cancellationToken)
        {
            var date = new List<GetAllDivisionsWorkScheduleResponse>();
            DateTime period = new(
                _date.GetYear(request.Period ?? throw new System.Exception("Упс! Что-то пошло не так")),
                _date.GetMonth(request.Period ?? throw new System.Exception("Упс! Что-то пошло не так")),
                1);

            foreach (var item in await _ctx.WorkCardDivisions.Where(p =>
                         p.PeriodReport == period).ToListAsync(cancellationToken))
            {
                date.Add(new GetAllDivisionsWorkScheduleResponse()
                {
                    Id = item.Id,
                    Division = item.Division?.Trim(),
                    Dates = JsonSerializer.Deserialize<ICollection<string>>(item.Date)
                });
            } 

            return await Task.FromResult(date);
        }
    }
}
