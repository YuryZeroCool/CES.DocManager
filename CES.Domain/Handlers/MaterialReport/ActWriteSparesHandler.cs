using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Spire.Xls;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class ActWriteSparesHandler : IRequestHandler<ActWriteSparesRequest, byte[]>
    {
        private readonly DocMangerContext _ctx;

        public ActWriteSparesHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<byte[]> Handle(ActWriteSparesRequest request, CancellationToken cancellationToken)
        {
            var startRow = 31;
            decimal totalSum = 0;
            double totalCount = 0;

            List<AddDecomissioneMaterial>? materials = null;

            var decommissionedMaterials = await _ctx.DecommissionedMaterials.Where(x => x.CurrentDate.Month == request.Month &&
            x.CurrentDate.Year == request.Year).ToListAsync(cancellationToken);

           
            materials = JoinMaterials(decommissionedMaterials);

            Workbook workbook = new Workbook();
            workbook.LoadFromFile(request.Path + "/Docs/materialAct.xls");
            Worksheet sheet = workbook.Worksheets[0];

            sheet.InsertRow(startRow, materials.Count);

            for (int j = 0; j < materials.Count; j++)
            {
                totalCount += materials[j].Count;
                totalSum += materials[j].Price * (decimal)materials[j].Count; 

                sheet.SetRowHeight(startRow + j, 50);

                sheet.Range[$"A{startRow + j}:B{startRow + j}"].Merge();
                sheet.Range[$"C{startRow + j}:F{startRow + j}"].Merge();
                sheet.Range[$"H{startRow + j}:J{startRow + j}"].Merge();
                sheet.Range[$"L{startRow + j}:N{startRow + j}"].Merge();
                sheet.Range[$"O{startRow + j}:R{startRow + j}"].Merge();
                sheet.Range[$"S{startRow + j}:T{startRow + j}"].Merge();

                sheet.Range[$"A{startRow + j}:T{startRow + j}"].Style.Font.FontName = "Times New Roman";
                sheet.Range[$"A{startRow + j}:T{startRow + j}"].Style.Font.IsBold = true;
                sheet.Range[$"C{startRow + j}:T{startRow + j}"].Style.ShrinkToFit = true;
                sheet.Range[$"A{startRow + j}:T{startRow + j}"].Style.HorizontalAlignment = HorizontalAlignType.Center;
                sheet.Range[$"A{startRow + j}:T{startRow + j}"].Style.VerticalAlignment = VerticalAlignType.Center;
                sheet.Range[$"A{startRow + j}:T{startRow + j}"].BorderInside(LineStyleType.Thin);
                sheet.Range[$"A{startRow + j}:T{startRow + j}"].BorderAround(LineStyleType.Thin);

                sheet.Range[$"A{startRow + j}"].Style.Font.Size = 10;
                sheet.Range[$"G{startRow + j}"].Style.Font.Size = 10;
                sheet.Range[$"H{startRow + j}"].Style.Font.Size = 10;
                sheet.Range[$"K{startRow + j}"].Style.Font.Size = 10;
                sheet.Range[$"L{startRow + j}"].Style.Font.Size = 10;
                sheet.Range[$"O{startRow + j}"].Style.Font.Size = 10;

                sheet.Range[$"L{startRow + j}"].NumberFormat = "0.00";
                sheet.Range[$"O{startRow + j}"].NumberFormat = "0.00";

                sheet.Range[$"A{startRow + j}"].Value = $"{1 + j}";
                sheet.Range[$"C{startRow + j}"].Value = $"{materials[j].NameMaterial}";
                sheet.Range[$"G{startRow + j}"].Value = $"{materials[j].Unit}";
                sheet.Range[$"H{startRow + j}"].Value = $"{materials[j].NameParty}";
                sheet.Range[$"K{startRow + j}"].Value = $"{materials[j].Count}";
                sheet.Range[$"L{startRow + j}"].Value = $"{materials[j].Price}";
                sheet.Range[$"O{startRow + j}"].Value = $"{materials[j].Price * (decimal)materials[j].Count}";

                sheet.Range[$"S{startRow + j}"].Value = $"Использована для ремонта автомобиля\n{materials[j].VehicleBrand} гос.№ {materials[j].NumberPlateCar}";
            }

            sheet.Range[$"K{startRow + materials.Count}"].Style.Font.IsBold = true;
            sheet.Range[$"O{startRow + materials.Count}"].Style.Font.IsBold = true;

            sheet.Range[$"K{startRow + materials.Count}"].Value = $"{totalCount}";
            sheet.Range[$"O{startRow + materials.Count}"].Value = $"{totalSum}";

            sheet.Range["K7"].Style.HorizontalAlignment = HorizontalAlignType.Center;
            sheet.Range["K7"].Style.VerticalAlignment = VerticalAlignType.Center;
            sheet.Range["K7"].Style.Font.IsBold = true;
            sheet.Range["K7"].Text = request.Month < 10 ? $"0{request.Month}/{request.Year}" : $"{request.Month}/{request.Year}";

            workbook.SaveToFile(request.Path + "/Docs/materialAct_Out.xls", ExcelVersion.Version97to2003);

            return await File.ReadAllBytesAsync(request.Path + "/Docs/materialAct_Out.xls", cancellationToken); 
        }

        private List<AddDecomissioneMaterial> JoinMaterials(List<DecommissionedMaterialEntity>? decommissionedMaterials)
        {
            if (decommissionedMaterials == null) throw new SystemException("Error");

            List<AddDecomissioneMaterial>? MaterialsList = new List<AddDecomissioneMaterial>();

            foreach (var item in decommissionedMaterials)
            {
               var  materials = JsonSerializer.Deserialize<List<AddDecomissioneMaterial>>(item.Materials);

                if (materials == null) throw new System.Exception("Error");

                foreach (var material in materials)
                {
                     var res = MaterialsList.FirstOrDefault(x => x.NameMaterial == material.NameMaterial && x.NameParty == material.NameParty);

                    if (!MaterialsList.Any(x => x.NameMaterial == material.NameMaterial && x.NameParty == material.NameParty))
                    {
                        MaterialsList.Add(material);
                    }
                    else
                    {
                        var index =  MaterialsList.FindIndex(x => x.NameMaterial == material.NameMaterial && x.NameParty == material.NameParty);
                        MaterialsList[index].Count += material.Count;
                        if (!MaterialsList[index].VehicleBrand!.Contains(material.VehicleBrand!))
                        {
                            MaterialsList[index].VehicleBrand += $" {material.VehicleBrand}";
                        }

                        if (!MaterialsList[index].NumberPlateCar!.Contains(material.NumberPlateCar!))
                        {
                            MaterialsList[index].NumberPlateCar += $" {material.NumberPlateCar}";
                        }
                    }
                }
            }
            
            return MaterialsList;
        }
    }
}
