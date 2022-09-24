using AutoMapper;
using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Report;
using CES.Domain.Services;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using System.Text.Json;

namespace CES.Domain.Handlers.Report
{
    public class CreateCardWorkDivisionDateHandler : IRequestHandler<CreateCardWorkDivisionDateRequest, CreateCardWorkDivisionDateResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly Date _date;
        private readonly IMapper _mapper;
        public CreateCardWorkDivisionDateHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
            _date = new Date();
        }
        public async Task<CreateCardWorkDivisionDateResponse> Handle(CreateCardWorkDivisionDateRequest request, CancellationToken cancellationToken)
        {
            ICollection<DateTime> dates=new List<DateTime>();
            DateTime period;
            foreach (var item in request.Dates ?? throw new System.Exception("Error"))
            {
                dates.Add( _date.SplitDate(item));
            }
            period = new DateTime(_date.GetYear(request.Dates.ToList()[0]), _date.GetMonth(request.Dates.ToList()[0]), 1);

            if (_ctx.WorkCardDivisions.Any(p => p.PeriodReport == period
            && p.Division == request.Division)) 
                throw new System.Exception("Error");

            await _ctx.WorkCardDivisions.AddAsync(new WorkCardDivisionsEntity()
            {
               Division =request?.Division?.Trim(),
               PeriodReport = period,
               Date = JsonSerializer.SerializeToUtf8Bytes(dates)
             });
             await _ctx.SaveChangesAsync();

            var db  =_ctx.WorkCardDivisions.FirstOrDefault(x => x.PeriodReport == period
            && x.Division.Trim() == request.Division );

            if (db == null) throw new System.Exception("Error");
              
            List<string> datesNew = new List<string>(); 
            foreach (var item in JsonSerializer.Deserialize<ICollection<string>>(db.Date))
            {
                datesNew.Add(item.Substring(0, 10));
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
