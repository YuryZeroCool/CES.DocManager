using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;
using System.Text.Json;
using File = System.IO.File;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetDefectiveSheetHandler : IRequestHandler<GetDefectiveSheetRequest, string>
    {
        private readonly DocMangerContext _ctx;

        private IWorkbook? _wk;


        private int Counter;

        public GetDefectiveSheetHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
            Counter = 7;
        }
        public async Task <string> Handle(GetDefectiveSheetRequest request, CancellationToken cancellationToken)
        {
        
            var pathXLS = request.Path+"/Docs/material.xls";
            var pathPDF = request.Path + "/Docs/material.pdf";

            byte[] bytes;
            string res;
            var fs = File.OpenRead(request.Path + "/Docs/doc.xls");

            _wk = WorkbookFactory.Create(fs);
            fs.Close();
             var sheet = _wk.GetSheet("Основной");

            var decommissionedMaterials = await _ctx.DecommissionedMaterials
              .Include(p =>p.CarMechanic).Include(p => p.NumberPlateOfCar).FirstOrDefaultAsync(p => p.Id == request.Id);

            if (decommissionedMaterials == null) throw new System.Exception("Error");

                var materials = JsonSerializer.Deserialize<List<AddDecomissioneMaterial>>(decommissionedMaterials.Materials);

                if (decommissionedMaterials.NumberPlateOfCar == null) throw new System.Exception("Error");

                if (materials == null) throw new System.Exception("Error");

                sheet.GetRow(3).GetCell(2).SetCellValue(materials[0].VehicleBrand + "-" + materials[0].VehicleModel);
                sheet.GetRow(3).GetCell(6).SetCellValue(decommissionedMaterials.NumberPlateOfCar.Number);
                foreach (var material in materials)
                {
                    sheet.GetRow(Counter).GetCell(2).SetCellValue(material.NameMaterial);
                    sheet.GetRow(Counter).GetCell(6).SetCellValue(material.Count);
                    sheet.GetRow(Counter).GetCell(7).SetCellValue("выполнено");
                    Counter++;
                }
                sheet.GetRow(23).GetCell(6).SetCellValue(decommissionedMaterials.CarMechanic?.FIO);

                sheet.GetRow(26).GetCell(1).SetCellValue(decommissionedMaterials.CurrentDate.Day);
                sheet.GetRow(26).GetCell(2).SetCellValue("Сентября");
            File.Delete(request.Path + "/Docs/material.xls");
            fs = File.OpenWrite(request.Path + "/Docs/material.xls");
            _wk.Write(fs);
            _wk.Close();
             fs.Close();
            var str = $"-f pdf -o {pathPDF} {pathXLS}";
            System.Diagnostics.Process.Start("unoconv", str)?.WaitForExit();

            bytes = await File.ReadAllBytesAsync(pathPDF);

            if (bytes == null) throw new SystemException("Error");
            res = Convert.ToBase64String(bytes);
            
            return await Task.FromResult(res);
        }
    }
}

