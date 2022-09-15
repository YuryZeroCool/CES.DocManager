using AutoMapper;
using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Report;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using System.Text.Json;

namespace CES.Domain.Handlers.Report
{
    public class CreateCardWorkDivisionDateHandler : IRequestHandler<CreateCardWorkDivisionDateRequest, CreateCardWorkDivisionDateResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;
        public CreateCardWorkDivisionDateHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<CreateCardWorkDivisionDateResponse> Handle(CreateCardWorkDivisionDateRequest request, CancellationToken cancellationToken)
        {
            ICollection<DateTime> dates=new List<DateTime>();
            bool res = false;
            int year = 0;
            int month = 0;
            int day = 0;

            foreach (var item in request.WorkDivisionDates)
            {
                var datesArr = item.Split("-");
                res =int.TryParse(datesArr[0], out var yearRes);
                if (res)
                {
                    year = yearRes;
                }
                else throw new System.Exception("Error ");
                res = int.TryParse(datesArr[1], out var monthRes);
                if (res)
                {
                    month = monthRes;
                }
                else throw new System.Exception("Error ");
                res = int.TryParse(datesArr[2], out var dayRes);
                if (res)
                {
                    day = dayRes;
                }
                else throw new System.Exception("Error ");
                dates.Add(new DateTime(year, month, day));
            }

            if(_ctx.WorkCardDivisions.Any(p => p.PeriodReport == new DateTime(year, month, 1) && p.Division == request.DivisionName)) 
                throw new System.Exception("Error");

           var date =  await _ctx.WorkCardDivisions.AddAsync(new WorkCardDivisionsEntity()
            {
               Division =request.DivisionName,
               PeriodReport = new DateTime(year, month,1),
               Date = JsonSerializer.SerializeToUtf8Bytes(dates)
             });
             await _ctx.SaveChangesAsync();

            var db  =_ctx.WorkCardDivisions.FirstOrDefault(x => x.PeriodReport == new DateTime(year, month, 1));

            if (db == null) throw new System.Exception("Error");

            return await Task.FromResult(new CreateCardWorkDivisionDateResponse()
            {
                Id = db.Id,
                DivisionName =db.Division,
                WorkDivisionDates = JsonSerializer.Deserialize<ICollection<string>>(db.Date)
            });
        }
    }
}
