using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Spire.Xls;
using System.Text.Json;
using File = System.IO.File;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetDefectiveSheetHandler : IRequestHandler<GetDefectiveSheetRequest, string>
    {
        private readonly DocMangerContext _ctx;

        private int _counter;
        public GetDefectiveSheetHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            _counter = 8;
        }
        public async Task <string> Handle(GetDefectiveSheetRequest request, CancellationToken cancellationToken)
        {
            var pathXls = request.Path+ "/Docs/repair.xls";
            var pathPdf = request.Path + "/Docs/repair.pdf";

            var workbook = new Workbook();
            workbook.LoadFromFile(pathXls);
            var sheet = workbook.Worksheets[0];

            var decommissionedMaterials = await _ctx.DecommissionedMaterials
              .Include(p =>p.CarMechanic)
              .Include(p => p.NumberPlateOfCar)
              .FirstOrDefaultAsync(p => p.Id == request.Id,cancellationToken);

            if (decommissionedMaterials == null) throw new System.Exception("Error");

                var materials = JsonSerializer.Deserialize<List<AddDecommissionedMaterial>>(decommissionedMaterials.Materials);

                if (decommissionedMaterials.NumberPlateOfCar == null) throw new System.Exception("Error");

                if (materials == null) throw new System.Exception("Error");

                sheet.Range[$"C4"].Value = $"{materials[0].VehicleBrand + "-" + materials[0].VehicleModel}";
                sheet.Range[$"G4"].Value = $"{decommissionedMaterials.NumberPlateOfCar.Number}";

            for (var i = 0; i < 10; i++)
            {
                if(i < materials.Count)
                {
                    sheet.Range[$"C{_counter}"].Value = $"{materials[i].NameMaterial}";
                    sheet.Range[$"G{_counter}"].Value = $"{materials[i].Count}";
                    sheet.Range[$"H{_counter}"].Value = "выполнено";
                    _counter++;
                }
                else
                {
                    sheet.Range[$"C{_counter}"].Value = "";
                    sheet.Range[$"G{_counter}"].Value = "";
                    sheet.Range[$"H{_counter}"].Value = "";
                    _counter++;
                }
            }

            sheet.Range[$"G23"].Value = $"/{decommissionedMaterials.CarMechanic?.FIO}/";
            sheet.Range[$"B26"].Value = $"{decommissionedMaterials.CurrentDate.Day}";
            sheet.Range[$"C26"].Value = $"{GetStringMonth(decommissionedMaterials.CurrentDate.Month)}";
            sheet.Range[$"D26"].Value = $"{decommissionedMaterials.CurrentDate.Year}";

            workbook.SaveToFile(pathXls, ExcelVersion.Version97to2003);
            var str = $"-f pdf -o {pathPdf} {pathXls}";
            await System.Diagnostics.Process.Start("unoconv", str).WaitForExitAsync(cancellationToken);

            var bytes = await File.ReadAllBytesAsync(pathPdf, cancellationToken);

            if (bytes == null) throw new SystemException("Error");
            var res = Convert.ToBase64String(bytes);
            
            return await Task.FromResult(res);
        }

        private string GetStringMonth (int month)
        {
            var arrMonths = new[] { 
                "Января", 
                "Февраля", 
                "Марта", 
                "Апреля", 
                "Мая",
                "Июня", 
                "Июля", 
                "Августа",
                "Сентября", 
                "Октября", 
                "Ноября", 
                "Декабря" 
            };

            for (var i = 1; i <= arrMonths.Length; i++)
            {
                if (i == month)
                {
                    return arrMonths[i-1];
                }
            }
            throw new System.Exception("Error");
        }
    }
}

