using CES.Domain.Models;
using CES.Domain.Models.Request.Report;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;
using System.Text.Json;

namespace CES.Domain.Handlers.Report
{
    public class AddFuelWorkCardHandler : IRequestHandler<FuelWorkCardRequest, int>
    {
        private Stream fs;
        private IWorkbook wk;

        private readonly DocMangerContext _ctx;

        public AddFuelWorkCardHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<int> Handle(FuelWorkCardRequest request, CancellationToken cancellationToken)
        {
            using (fs = request.FuelWorkCardFile.OpenReadStream())
            {
                wk = WorkbookFactory.Create(fs);
            }
            
            for (int i = 0; i < wk.NumberOfSheets; i++)
            {
                var rows = wk.GetSheetAt(i);
                if (rows == null || rows.LastRowNum == 0) continue;
               var carId =  await _ctx.NumberPlateOfCar.FirstOrDefaultAsync(p=>rows.GetRow(1).GetCell(0).ToString().Contains(p.Number.Trim()));
               
               List<FuelWorkCardModel> rowsArr = new List<FuelWorkCardModel>();
               var card = new FuelWorkCardEntity();

               card.NumberPlateCar = carId;
               card.WorkDate = GetDate(rows.GetRow(6).GetCell(1).ToString());

                for (int j = 6; j < rows.LastRowNum; j++)
                {
                    if (rows.GetRow(j).GetCell(0).ToString() == "ИТОГО") break;
                    if (rows.GetRow(j).GetCell(0) != null && rows.GetRow(j).GetCell(0).ToString() != "")
                    {
                        if (rows.GetRow(j).GetCell(2) != null && rows.GetRow(j).GetCell(2).ToString() != "")
                        {
                            var cardRow = new FuelWorkCardModel()
                            {
                                Date = GetDate(rows.GetRow(j).GetCell(1).ToString())
                            };
                            if (rows.GetRow(j).GetCell(2).ToString() != "")
                            {
                                cardRow.NumberList = int.Parse(rows.GetRow(j).GetCell(2).ToString());
                            } // Номер путевого листа
                            if (rows.GetRow(j).GetCell(3).ToString() != "")
                            {
                                cardRow.DriverFullName = rows.GetRow(j).GetCell(3).ToString().Split(",")[0];
                            } // Водитель
                            if (rows.GetRow(j).GetCell(4).ToString() != "")
                            {
                                cardRow.HoursWorked = int.Parse(rows.GetRow(j).GetCell(4).ToString());
                            } // Отработано часов 
                            if (rows.GetRow(j).GetCell(6).ToString() != "")
                            {
                                cardRow.MileageStart = int.Parse(rows.GetRow(j).GetCell(6).ToString());
                            } // Начальный спедометр
                            if (rows.GetRow(j).GetCell(7).ToString() != "")
                            {
                                cardRow.MileageEnd = int.Parse(rows.GetRow(j).GetCell(7).ToString());
                            } // Конечный спедометр
                            if (rows.GetRow(j).GetCell(8).ToString() != "")
                            {
                                cardRow.MileagePerDay = int.Parse(rows.GetRow(j).GetCell(8).ToString());
                            } // Пробег за день
                            if (rows.GetRow(j).GetCell(10).ToString() != "")
                            {
                                cardRow.FuelStart = int.Parse(rows.GetRow(j).GetCell(10).ToString());
                            } // Топливо на начала
                            if (rows.GetRow(j).GetCell(14).ToString() != "")
                            {
                                cardRow.FuelEnd = int.Parse(rows.GetRow(j).GetCell(14).ToString());
                            } // Топливо на конец дня
                            if (rows.GetRow(j).GetCell(12).ToString() != "")
                            {
                                cardRow.ActualConsumption = double.Parse(rows.GetRow(j).GetCell(12).ToString());
                            } // Расход по факту
                            if (rows.GetRow(j).GetCell(13).ToString() != "")
                            {
                                cardRow.ConsumptionAccordingToNorm =
                                    Double.Parse(rows.GetRow(j).GetCell(13).ToString());
                            } // Расход по нормам
                            if (rows.GetRow(j).GetCell(11) != null && rows.GetRow(j).GetCell(11).ToString() != "")
                            {
                                cardRow.Refueling = Double.Parse(rows.GetRow(j).GetCell(11).ToString());
                            } //Заправка
                            if (rows.GetRow(j + 1).GetCell(6).ToString() !="")
                            {
                                cardRow.EngineHoursStart = double.Parse(rows.GetRow(j + 1).GetCell(6).ToString());
                                cardRow.EngineHoursEnd = double.Parse(rows.GetRow(j + 1).GetCell(7).ToString());
                            }
                            rowsArr.Add(cardRow);
                        }
                    }
                }
                card.Data = JsonSerializer.SerializeToUtf8Bytes(rowsArr);

                if (!_ctx.FuelWorkCards.Any(p => p.WorkDate == card.WorkDate && p.NumberPlateCar == card.NumberPlateCar))
                {
                    await _ctx.FuelWorkCards.AddAsync(card);
                    await _ctx.SaveChangesAsync();
                }
            }
            
            return 200;

        }
        private DateTime GetDate(string date)
        {
            var strDate = date.Split(".").Reverse();
            var newDate = String.Join('-', strDate);

            return DateTime.Parse(newDate);
        }
    }
  
}
