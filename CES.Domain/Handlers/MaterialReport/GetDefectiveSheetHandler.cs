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

        //private IWorkbook? _wk;


        private int Counter;


        public GetDefectiveSheetHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            Counter = 8;
        }
        public async Task <string> Handle(GetDefectiveSheetRequest request, CancellationToken cancellationToken)
        {
        
            var pathXLS = request.Path+ "/Docs/repair.xls";
            var pathPDF = request.Path + "/Docs/repair.pdf";

            byte[] bytes;
            string res;
         
            Workbook workbook = new Workbook();
            workbook.LoadFromFile(pathXLS);
            Worksheet sheet = workbook.Worksheets[0];

            var decommissionedMaterials = await _ctx.DecommissionedMaterials
              .Include(p =>p.CarMechanic)
              .Include(p => p.NumberPlateOfCar)
              .FirstOrDefaultAsync(p => p.Id == request.Id,cancellationToken);

            if (decommissionedMaterials == null) throw new System.Exception("Error");

                var materials = JsonSerializer.Deserialize<List<AddDecomissioneMaterial>>(decommissionedMaterials.Materials);

                if (decommissionedMaterials.NumberPlateOfCar == null) throw new System.Exception("Error");

                if (materials == null) throw new System.Exception("Error");

                sheet.Range[$"C4"].Value = $"{materials[0].VehicleBrand + "-" + materials[0].VehicleModel}";
                sheet.Range[$"G4"].Value = $"{decommissionedMaterials.NumberPlateOfCar.Number}";

            for (int i = 0; i < 10; i++)
            {
                if(i < materials.Count)
                {
                    sheet.Range[$"C{Counter}"].Value = $"{materials[i].NameMaterial}";
                    sheet.Range[$"G{Counter}"].Value = $"{materials[i].Count}";
                    sheet.Range[$"H{Counter}"].Value = "выполнено";
                    Counter++;
                }
                else
                {
                    sheet.Range[$"C{Counter}"].Value = "";
                    sheet.Range[$"G{Counter}"].Value = "";
                    sheet.Range[$"H{Counter}"].Value = "";
                    Counter++;
                }
            }

            sheet.Range[$"G23"].Value = $"/{decommissionedMaterials.CarMechanic?.FIO}/";
            sheet.Range[$"B26"].Value = $"{decommissionedMaterials.CurrentDate.Day}";
            sheet.Range[$"C26"].Value = $"{GetStringMonth(decommissionedMaterials.CurrentDate.Month)}";

            workbook.SaveToFile(pathXLS, ExcelVersion.Version97to2003);
            var str = $"-f pdf -o {pathPDF} {pathXLS}";
            System.Diagnostics.Process.Start("unoconv", str)?.WaitForExit();

            bytes = await File.ReadAllBytesAsync(pathPDF);

            if (bytes == null) throw new SystemException("Error");
            res = Convert.ToBase64String(bytes);
            
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

            for (int i = 1; i <= arrMonths.Length; i++)
            {
                if(i == month)
                {
                    return arrMonths[i-1];
                }
            }
            throw new System.Exception("Error");
        }
    }
}

