using CES.Domain.Models;
using CES.Domain.Models.Request.Report;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;
using System.Text.Json;

namespace CES.Domain.Handlers.FuelReport
{
    public class AddFuelWorkCardHandler : IRequestHandler<FuelWorkCardRequest, int>
    {
        private Stream? _fs;

        private IWorkbook? _wk;

        private readonly DocMangerContext _ctx;

        public AddFuelWorkCardHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<int> Handle(FuelWorkCardRequest request, CancellationToken cancellationToken)
        {
            if (request.FuelWorkCardFile == null) throw new System.Exception("Error");

            await using (_fs = request.FuelWorkCardFile.OpenReadStream())
            {
                _wk = WorkbookFactory.Create(_fs);
            }
            
            for (var i = 0; i < _wk.NumberOfSheets; i++)
            {
                var rows = _wk.GetSheetAt(i);
                if (rows == null || rows.LastRowNum == 0) continue;

                var row = rows.GetRow(1).GetCell(0).ToString() ?? throw new System.Exception("Error");

                var carId = await _ctx.NumberPlateOfCar.FirstOrDefaultAsync(p =>
                row.Contains(p.Number!.Trim()), cancellationToken);

                List<FuelWorkCardModel> rowsArr = new();
                var currentDate = GetDate(rows.GetRow(6)?.GetCell(1)?.ToString());
                var card = new FuelWorkCardEntity
                {
                    NumberPlateCar = carId,
                    WorkDate = new DateTime(currentDate.Year, currentDate.Month, 1)
                };

                for (int j = 6; j < rows.LastRowNum; j++)
                {
                    if (rows.GetRow(j).GetCell(0).ToString() == "ИТОГО") break;
                    if (rows.GetRow(j).GetCell(0) != null && rows.GetRow(j).GetCell(0).ToString() != "")
                    {
                        if (rows.GetRow(j).GetCell(2) != null && rows.GetRow(j).GetCell(2).ToString() != "")
                        {
                            var cardRow = new FuelWorkCardModel();
                            bool res = false;
                            if (rows.GetRow(j).GetCell(1).ToString() != null)
                            {
                                cardRow.Date = GetDate(rows.GetRow(j).GetCell(1).ToString());
                            }

                            if (rows.GetRow(j).GetCell(2).ToString() != "")
                            {
                                res = int.TryParse( rows.GetRow(j).GetCell(2).ToString(), out var number);
                                if (res) cardRow.NumberList = number;
                            } // Номер путевого листа
                            if (rows?.GetRow(j).GetCell(3).ToString() != "")
                            {
                                cardRow.DriverFullName = rows?.GetRow(j)?.GetCell(3)?.ToString()?.Split(",")[0];
                            } // Водитель
                            if (rows?.GetRow(j).GetCell(4).ToString() != "")
                            {
                                res = int.TryParse(rows?.GetRow(j)?.GetCell(4).ToString(),out var HoursWorked);
                                if(res) cardRow.HoursWorked = HoursWorked;
                            } // Отработано часов 
                            if (rows.GetRow(j).GetCell(6).ToString() != "")
                            {
                                res = int.TryParse(rows.GetRow(j).GetCell(6).ToString(),out var MileageStart);
                                if (res) cardRow.MileageStart = MileageStart;
                            } // Начальный спедометр
                            if (rows.GetRow(j).GetCell(7).ToString() != "")
                            {
                                res = int.TryParse(rows.GetRow(j).GetCell(7).ToString(), out var MileageEnd);
                                if (res) cardRow.MileageEnd = MileageEnd;
                            } // Конечный спедометр
                            if (rows.GetRow(j).GetCell(8).ToString() != "")
                            {
                                res = int.TryParse(rows.GetRow(j).GetCell(8).ToString(),out var MileagePerDay);
                                if (res) cardRow.MileagePerDay = MileagePerDay;
                            } // Пробег за день
                            if (rows.GetRow(j).GetCell(10).ToString() != "")
                            {
                                res = int.TryParse(rows.GetRow(j).GetCell(10).ToString(),out var FuelStart);
                                if(res) cardRow.FuelStart = FuelStart;
                            } // Топливо на начала
                            if (rows.GetRow(j).GetCell(14).ToString() != "")
                            {
                                res = int.TryParse(rows.GetRow(j).GetCell(14).ToString(), out var FuelEnd);
                                if(res) cardRow.FuelEnd = FuelEnd;
                            } // Топливо на конец дня
                            if (rows.GetRow(j).GetCell(12).ToString() != "")
                            {
                               res = double.TryParse(rows.GetRow(j).GetCell(12).ToString(),out double ActualConsumption);
                                if (res) cardRow.ActualConsumption = ActualConsumption;

                            } // Расход по факту
                            if (rows.GetRow(j).GetCell(13).ToString() != "")
                            {
                                res = double.TryParse(rows.GetRow(j).GetCell(13).ToString(), out var ConsumptionAccordingToNorm);
                                if(res) cardRow.ConsumptionAccordingToNorm = ConsumptionAccordingToNorm;
                            } // Расход по нормам
                            if (rows.GetRow(j).GetCell(11) != null && rows.GetRow(j).GetCell(11).ToString() != "")
                            {
                                res = double.TryParse(rows.GetRow(j).GetCell(11).ToString(),out var Refueling);
                                if (res) cardRow.Refueling = Refueling;
                            } //Заправка
                            if (rows.GetRow(j + 1).GetCell(6).ToString() != "")
                            {
                                res = double.TryParse(rows.GetRow(j + 1).GetCell(6).ToString(),out var EngineHoursStart);
                                if (res) cardRow.EngineHoursStart = EngineHoursStart;

                                res = double.TryParse(rows.GetRow(j + 1).GetCell(7).ToString(),out var EngineHoursEnd);
                                if (res) cardRow.EngineHoursEnd = EngineHoursEnd;
                            }
                            rowsArr.Add(cardRow);
                        }
                    }
                }
                card.Data = JsonSerializer.SerializeToUtf8Bytes(rowsArr);

                if (!_ctx.FuelWorkCards.Any(p => p.WorkDate == card.WorkDate && p.NumberPlateCar == card.NumberPlateCar))
                {
                    await _ctx.FuelWorkCards.AddAsync(card, cancellationToken);
                    await _ctx.SaveChangesAsync(cancellationToken);
                }
            }
            return 200;
        }
        private DateTime GetDate(string date)
        {
            if (string.IsNullOrEmpty(date)) throw new System.Exception("Error");

            var strDate = date.Split(".").Reverse().ToList();
            var newDate = String.Join('-', strDate);

            return DateTime.Parse(newDate);
        }
    }
  
}
