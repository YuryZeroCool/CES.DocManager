using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Report;
using CES.Domain.Services;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.FuelReport
{
    public class CreateCardWorkDivisionDateHandler : IRequestHandler<CreateCardWorkDivisionDateRequest, CreateCardWorkDivisionDateResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly Date _date;
        public CreateCardWorkDivisionDateHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            _date = new Date();
        }
        public async Task<CreateCardWorkDivisionDateResponse> Handle(CreateCardWorkDivisionDateRequest request, CancellationToken cancellationToken)
        {
            if (request == null) throw new System.Exception("Error");

            ICollection<DateTime> dates = new List<DateTime>();

            foreach (var item in request.Dates ?? throw new System.Exception("Error"))
            {
                dates.Add( _date.SplitDate(item));
            }

            var period = new DateTime(_date.GetYear(request.Dates.ToList()[0]), _date.GetMonth(request.Dates.ToList()[0]), 1);

            if (_ctx.WorkCardDivisions.Any(p => p.PeriodReport == period
            && p.Division == request.Division)) 
                throw new System.Exception("Error");

            if (request.Division == null) throw new System.Exception("Error");

            await _ctx.WorkCardDivisions.AddAsync(new WorkCardDivisionsEntity()
            {
               Division = request.Division.Trim(),
               PeriodReport = period,
               Date = JsonSerializer.SerializeToUtf8Bytes(dates)
            }, cancellationToken);

            await _ctx.SaveChangesAsync(cancellationToken);

            var db = await _ctx.WorkCardDivisions.FirstOrDefaultAsync(x => x.PeriodReport == period
            && x.Division == request.Division, cancellationToken);

            if (db == null) throw new System.Exception("Error");
              
            var datesNew = new List<string>();
            var datesCollection = JsonSerializer.Deserialize<ICollection<string>>(db.Date);
            if (datesCollection == null) throw new System.Exception("Error");

            foreach (var item in datesCollection)
            {
                datesNew.Add(item[..10]);
            }
            return await Task.FromResult(new CreateCardWorkDivisionDateResponse()
            {
                Id = db.Id,
                Division =db.Division,
                Dates = datesNew
            });
        }
    }
}
