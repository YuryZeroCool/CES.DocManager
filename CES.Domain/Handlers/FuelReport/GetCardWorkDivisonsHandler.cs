using CES.Domain.Models;
using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Report;
using CES.Domain.Services;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.Report
{
    public class GetCardWorkDivisonsHandler : IRequestHandler<GetCardWorkDivisionsRequest, GetCardWorkDivisionsResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly Date _date;
        public GetCardWorkDivisonsHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            _date = new Date();
        }
        public async Task<GetCardWorkDivisionsResponse> Handle(GetCardWorkDivisionsRequest request, CancellationToken cancellationToken)
        {

            var cardWorkDivision = new GetCardWorkDivisionsResponse();

            var period = _date.SplitDate(request.ReportPeriod!);

           var  workCardDivisions = await _ctx.WorkCardDivisions.Where(p => p.PeriodReport == period).ToListAsync(cancellationToken);

            if (workCardDivisions == null) throw new System.Exception("Error");

            var car = await _ctx.NumberPlateOfCar
                .Where(p => p.GarageNumber == request.GarageNumber)
                .Include(p => p.FuelWorkCards.Where(x=>x.WorkDate == period)).ToListAsync(cancellationToken);

            var arr = JsonSerializer.Deserialize<List<FuelWorkCardModel>>(car[0].FuelWorkCards.ToList()[0].Data);

            if (arr == null) throw new System.Exception("Error");


            foreach (var item in workCardDivisions)
            {
                if( item.Division == "Смена №1")
                {
                   var dates = JsonSerializer.Deserialize<List<DateTime>>(item.Date);

                    if (dates == null) throw new System.Exception("Error");
                    foreach (var date in dates)
                    {
                       var res = arr.Where(x => x.Date == date);
                        if (res.Any() && res != null)
                        {
                            foreach (var card in res)
                            {
                                cardWorkDivision.MileagePerMonthDivision1 += card.MileagePerDay;
                                cardWorkDivision.FuelPerMonthDivision1 += card.ActualConsumption;
                                cardWorkDivision.SumMileage += card!.MileagePerDay;
                                cardWorkDivision.SumFuel += card.ActualConsumption;
                            } 
                        }
                    }
                }
                if (item.Division == "Смена №2")
                {
                    var dates = JsonSerializer.Deserialize<List<DateTime>>(item.Date);
                    if (dates == null) throw new System.Exception("Error");

                    foreach (var date in dates)
                    {
                        var res = arr.Where(x => x.Date == date);

                        if (res.Any() && res != null)
                        {
                            foreach(var card in res)
                            {
                                cardWorkDivision.MileagePerMonthDivision2 += card.MileagePerDay;
                                cardWorkDivision.FuelPerMonthDivision2 += card.ActualConsumption;
                                cardWorkDivision.SumMileage += card!.MileagePerDay;
                                cardWorkDivision.SumFuel += card.ActualConsumption;
                            }
                        }
                    }
                }
                if (item.Division == "Смена №3")
                {
                    var dates = JsonSerializer.Deserialize<List<DateTime>>(item.Date);

                    if (dates == null) throw new System.Exception("Error");

                    foreach (var date in dates)
                    {
                        var res = arr.Where(x => x.Date == date);
                        if (res.Any() && res != null)
                        {
                            foreach (var card in res)
                            {
                                cardWorkDivision.MileagePerMonthDivision3 += card.MileagePerDay;
                                cardWorkDivision.FuelPerMonthDivision3 += card.ActualConsumption;
                                cardWorkDivision.SumMileage += card!.MileagePerDay;
                                cardWorkDivision.SumFuel += card.ActualConsumption;
                            }
                        }
                    }
                }
               if (item.Division == "Смена №4")
               {
                    var dates = JsonSerializer.Deserialize<List<DateTime>>(item.Date);
                    if (dates == null) throw new System.Exception("Error");

                    foreach (var date in dates)
                    {
                        var res = arr.Where(x => x.Date == date);

                        if (res.Any() && res != null)
                        {
                            foreach (var card in res)
                            {
                                cardWorkDivision.MileagePerMonthDivision4 += card.MileagePerDay;
                                cardWorkDivision.FuelPerMonthDivision4 += card.ActualConsumption;
                                cardWorkDivision.SumMileage += card!.MileagePerDay;
                                cardWorkDivision.SumFuel += card.ActualConsumption;
                            }
                        }
                    }
                }
            }
            return await Task.FromResult(cardWorkDivision);
        }
    }
}
