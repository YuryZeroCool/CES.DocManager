using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Report;
using CES.Domain.Services;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Report
{
    public class GetCardWorkDivisonsHandler : IRequestHandler<GetCardWorkDivisionsRequest, List<GetCardWorkDivisionsResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly Date _date;
        public GetCardWorkDivisonsHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            _date = new Date();
        }
        public async Task<List<GetCardWorkDivisionsResponse>> Handle(GetCardWorkDivisionsRequest request, CancellationToken cancellationToken)
        {
            //var MileagePerMonth1 = 0;
            //double fuelPerMonth1 = 0;

            //var MileagePerMonth2 = 0;
            //double fuelPerMonth2 = 0;

            //var MileagePerMonth3 = 0;
            //double fuelPerMonth3 = 0;

            //var MileagePerMonth4 = 0;
            //double fuelPerMonth4 = 0;

           var period = _ctx.WorkCardDivisions.FirstOrDefault(p => p.PeriodReport == _date.SplitDate(request.ReportPeriod));
            //var MileagePerMonth1 = new Model();


            //var MileagePerMonth2 = new Model();


            //var MileagePerMonth3 = new Model();


            //var MileagePerMonth4 
           

            List<string> datesDivision1 = new List<string>()
            {
                new DateTime(2022,8,2).ToString(),
                new DateTime(2022,8,6).ToString(),
                new DateTime(2022,8,10).ToString(),
                new DateTime(2022,8,14).ToString(),
                new DateTime(2022,8,18).ToString(),
                new DateTime(2022,8,22).ToString(),
                new DateTime(2022,8,26).ToString(),
                new DateTime(2022,8,30).ToString(),
            };
            List<string> datesDivision2 = new List<string>()
            {
                new DateTime(2022,8,1).ToString(),
                new DateTime(2022,8,5).ToString(),
                new DateTime(2022,8,9).ToString(),
                new DateTime(2022,8,13).ToString(),
                new DateTime(2022,8,17).ToString(),
                new DateTime(2022,8,21).ToString(),
                new DateTime(2022,8,25).ToString(),
                new DateTime(2022,8,29).ToString(),
            };
            List<string> datesDivision3 = new List<string>()
            {
                 new DateTime(2022,8,4).ToString(),
                new DateTime(2022,8,8).ToString(),
                new DateTime(2022,8,12).ToString(),
                new DateTime(2022,8,16).ToString(),
                new DateTime(2022,8,20).ToString(),
                new DateTime(2022,8,24).ToString(),
                new DateTime(2022,8,28).ToString(),
            };
            List<string> datesDivision4 = new List<string>()
            {
                 new DateTime(2022,8,3).ToString(),
                new DateTime(2022,8,7).ToString(),
                new DateTime(2022,8,11).ToString(),
                new DateTime(2022,8,15).ToString(),
                new DateTime(2022,8,19).ToString(),
                new DateTime(2022,8,23).ToString(),
                new DateTime(2022,8,27).ToString(),
                new DateTime(2022,8,31).ToString(),
            };

           // var date = new DateTime(2022, 8, 1).ToString("u").Substring(0, 10);
            //var data = _ctx.NumberPlateOfCar.Where(p => p.GarageNumber == request.GarageNumber)
            //    .Include(p => p.FuelWorkCards
            //    .Where(x =>
            //    x.WorkDate.ToString()
            //    .Contains(date))).ToList()[0];

          //  var arr = JsonSerializer.Deserialize<List<FuelWorkCardModel>>(data.FuelWorkCards.ToList()[0].Data);

    //        foreach (var item in datesDivision1)
    //        {
    //            var res = arr.FirstOrDefault(x => x.Date.ToString().Contains(item));
    //            if (res != null)
    //            {
    //                //MileagePerMonth1.MileagePerMonth += res.MileagePerDay;
    //                //MileagePerMonth1.fuelPerMonth += res.ActualConsumption;

    //}
    //        }
    //        foreach (var item in datesDivision2)
    //        {
    //            var res = arr.FirstOrDefault(x => x.Date.ToString().Contains(item));
    //            if (res != null)
    //            {
    //                //MileagePerMonth2.MileagePerMonth += res.MileagePerDay;
    //                //MileagePerMonth2.fuelPerMonth += res.ActualConsumption;
    //            }

    //        }
    //        foreach (var item in datesDivision3)
    //        {
    //            var res = arr.FirstOrDefault(x => x.Date.ToString().Contains(item));
    //            if (res != null)
    //            {
    //                //MileagePerMonth3.MileagePerMonth += res.MileagePerDay;
    //                //MileagePerMonth3.fuelPerMonth += res.ActualConsumption;

    //            }
    //        }
    //        foreach (var item in datesDivision4)
    //        {
    //            var res = arr.FirstOrDefault(x => x.Date.ToString().Contains(item));
    //            if (res != null)
    //            {
    //                //MileagePerMonth4.MileagePerMonth += res.MileagePerDay;
    //                //MileagePerMonth4.fuelPerMonth += res.ActualConsumption;
    //            }
    //        }
    //        //var d = new List<List<object>>() {
    //        //       new List<int>() { MileagePerMonth1, MileagePerMonth2 ,MileagePerMonth3 ,MileagePerMonth4 },
    //        //         new List<double>() { fuelPerMonth1,fuelPerMonth2, fuelPerMonth3 ,fuelPerMonth4 },
    //        // };

    //        // MileagePerMonth1.SumMileage = 
    //        //    MileagePerMonth1.MileagePerMonth+
    //        //    MileagePerMonth2.MileagePerMonth+
    //        //    MileagePerMonth3.MileagePerMonth+
    //        //    MileagePerMonth4.MileagePerMonth;

    //        //MileagePerMonth1.SumFuel =
    //        //    MileagePerMonth1.fuelPerMonth +
    //        //    MileagePerMonth2.fuelPerMonth +
    //        //    MileagePerMonth3.fuelPerMonth +
    //        //    MileagePerMonth4.fuelPerMonth;
        return null;
        }
    }
}
