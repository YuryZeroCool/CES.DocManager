using CES.Domain.Models;
using CES.Domain.Models.Request.FuelReport;
using CES.Domain.Models.Response.FuelReport;
using CES.Domain.Services;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.FuelReport
{
    public class GetAllWorkCardsHandler : IRequestHandler<GetAllWorkCardsRequest, List<GetAllWorkCardsResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly Date _date;
        public GetAllWorkCardsHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            _date = new Date();
        }
        public async Task<List<GetAllWorkCardsResponse>> Handle(GetAllWorkCardsRequest request, CancellationToken cancellationToken)
        {

            var allWorkCards = new List<GetAllWorkCardsResponse>();

            var period = _date.SplitDate($"{request.Year}-{request.Month}-01");

            var divisions = await _ctx.Divisions.Select(x => x.Name).ToListAsync(cancellationToken);
            if (divisions == null) throw new System.Exception("Смены не найдены");

            foreach (var division in divisions)
            {
                var allCars = await _ctx.Divisions
                    .Include(y => y.NumberPlateOfCars)
                    .FirstOrDefaultAsync(x => x.Name == division, cancellationToken);

                var dates = await _ctx.WorkCardDivisions
                    .FirstOrDefaultAsync(x => x.Division == division && x.PeriodReport == period, cancellationToken);

                if (dates == null && allCars != null && allCars.NumberPlateOfCars != null)
                {
                    foreach(var car in allCars.NumberPlateOfCars)
                    {
                        var card = await _ctx.FuelWorkCards
                            .FirstOrDefaultAsync(x => x.NumberPlateCar!.GarageNumber == car.GarageNumber
                                && x.WorkDate == period, cancellationToken);
                        if (card != null)
                        {
                            var data = JsonSerializer.Deserialize<List<FuelWorkCardModel>>(card.Data);
                            if (data != null)
                            {
                                var fuel = data.Sum(x => x.ActualConsumption);
                                var mileage = data.Sum(x => x.MileagePerDay);

                                var workCard = new GetAllWorkCardsResponse
                                {
                                    Id = car.Id,
                                    CarNumber = car.Number,
                                    SumMileage = mileage,
                                    SumFuel = fuel,
                                };

                                workCard.WorkCards.Add(new WorkCardsResponse
                                {
                                    Id = car.Id * 2,
                                    Division = division,
                                    FuelPerMonth = fuel,
                                    MileagePerMonth = mileage,
                                });

                                allWorkCards.Add(workCard);
                            }    
                        } 
                    }
                }
                else
                {
                    var workDates = JsonSerializer.Deserialize<ICollection<DateTime>>(dates.Date);
                    if (workDates == null) throw new System.Exception("Error");

                    foreach (var car in allCars.NumberPlateOfCars)
                    {
                        var card = await _ctx.FuelWorkCards
                            .FirstOrDefaultAsync(x => x.NumberPlateCar!.GarageNumber == car.GarageNumber
                                && x.WorkDate == period, cancellationToken);
                        if (card != null)
                        {
                            var data = JsonSerializer.Deserialize<List<FuelWorkCardModel>>(card.Data);
                            if (data != null)
                            {
                                double fuel = 0;
                                var mileage = 0;
                                foreach (var workDate in workDates)
                                {
                                    var res = data.Where(x => x.Date == workDate).ToList();
                                    fuel += res.Sum(x => x.ActualConsumption);
                                    mileage += res.Sum(x => x.MileagePerDay);
                                }
                                if (allWorkCards.Any(x => x.CarNumber == car.Number))
                                {
                                    var currentCar = allWorkCards.FirstOrDefault(x => x.CarNumber == car.Number);
                                    currentCar.SumMileage += mileage;
                                    currentCar.SumFuel += fuel;

                                    currentCar.WorkCards.Add(new WorkCardsResponse
                                    {
                                        Id = currentCar.WorkCards.Last().Id + 1,
                                        Division = division,
                                        FuelPerMonth = fuel,
                                        MileagePerMonth = mileage,
                                    });
                                }
                                else
                                {
                                    var workCard = new GetAllWorkCardsResponse
                                    {
                                        Id = car.Id,
                                        CarNumber = car.Number,
                                        SumMileage = mileage,
                                        SumFuel = fuel,
                                    };

                                    workCard.WorkCards.Add(new WorkCardsResponse
                                    {
                                        Id = car.Id * 2,
                                        Division = division,
                                        FuelPerMonth = fuel,
                                        MileagePerMonth = mileage,
                                    });
                                    allWorkCards.Add(workCard);
                                }


                            }

                        }

                    }
                };
            }
            return await Task.FromResult(allWorkCards);
        }
    }
}
