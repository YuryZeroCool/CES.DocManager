using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;
using Spire.Xls;
using System.Text.Json;

namespace CES.Domain.Handlers.MaterialReport
{
    public class ActWriteSparesHandler : IRequestHandler<ActWriteSparesRequest,object>
    {
        private readonly DocMangerContext _ctx;

        private IWorkbook? _wk; 

        public ActWriteSparesHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<object> Handle(ActWriteSparesRequest request, CancellationToken cancellationToken)
        {
            var startRow = 32;

           var decommissionedMaterials = await _ctx.DecommissionedMaterials.Where(x => x.CurrentDate.Month == request.Date ).ToListAsync(cancellationToken);

            if (decommissionedMaterials == null) throw new SystemException("Error");

            foreach (var material in decommissionedMaterials)
            {
                var materials = JsonSerializer.Deserialize<List<AddDecomissioneMaterial>>(material.Materials);
            }

            Workbook workbook = new Workbook();
        
            workbook.LoadFromFile(request.Path + "/Docs/spares.xls");
            Worksheet sheet = workbook.Worksheets[0];
             sheet.InsertRow(32, decommissionedMaterials.Count);
            //sheet.Copy(sheet.Rows[30], sheet.Rows[31], true, true, true);
            //sheet.Copy(sheet.Rows[30], sheet.Rows[32], true, true, true);
            //sheet.Copy(sheet.Rows[30], sheet.Rows[33], true, true, true);
            //sheet.Copy(sheet.Rows[30], sheet.Rows[34], true, true, true);
            for (int i = 0; i < decommissionedMaterials.Count; i++)
            {
               
               // sheet.Copy(sheet.Rows[31], sheet.Rows[++startRow], true, true, true);
               // sheet.SetRowHeight(startRow += 1, 40);
            }

            //sheet.SetRowHeight(31, 40);
            //CellRange cell = sheet.Range["C31:S31"];
            //CellStyle style = cell.Style;
            //style.ShrinkToFit =true;

            //sheet.SetRowHeight(33, 50);
            //sheet.SetRowHeight(34, 50);

            // sheet.SetRowHeight(32, 25);
            //var sheet = _wk.GetSheet("Worksheet");
            // var oldRow = sheet.GetRow(30).Copy();
            // var oldStyle = oldRow.RowStyle;

            // var count = sheet.LastRowNum;

            //sheet.ShiftRows(31, 32,3,true,true);
            // //var d = sheet.GetMergedRegion(1).;

            //var row = sheet.CreateRow(32);
            //var cell = row.CreateCell(0);
            //cell.SetCellValue("some string");
            //sheet.AddMergedRegion(new CellRangeAddress(32, 32, 0, 5));

            //sheet.CopyRow(30, 30);

            //sheet.CopyRow(31, 32);
            //sheet.CopyRow(32, 33);

            //sheet.CopyRow(33, 34);

            //fs = File.OpenWrite(request.Path + "/Docs/sparesOut.xls");
            workbook.SaveToFile(request.Path + "/Docs/sparesOut.xls", ExcelVersion.Version97to2003);
            //_wk.Write(fs);
            //_wk.Close();

            //fs.Close();
            return decommissionedMaterials; 
        }
    }
}
