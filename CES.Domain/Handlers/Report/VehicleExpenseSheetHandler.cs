using CES.Domain.Models.Request.Report;
using CES.XmlFormat;
using MediatR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CES.Domain.Handlers.Report
{
    public class VehicleExpenseSheetHandler : IRequestHandler<VehicleExpenseSheetRequest, List<List<string>>>
    {
        private readonly ReadExcel _readExcel;

        public VehicleExpenseSheetHandler()
        {
            _readExcel = new ReadExcel();
        }
        public Task<List<List<string>>> Handle(VehicleExpenseSheetRequest request, CancellationToken cancellationToken)
        {
            try
            {
                DirectoryInfo dirInfo = new(request.Path + "/download");
                var dirPath = request.Path + "/download/" + dirInfo.GetFiles()[0].Name;
                var data = _readExcel.readExcel(dirPath).ToList();
                return Task.FromResult(data);
            }
            catch (IndexOutOfRangeException)
            {
                List<string> errorData = new List<string>();
                errorData.Add("folder is empty");
                return Task.FromResult(new List<List<string>>() { errorData });
            }
            catch (System.Exception)
            {
                List<string> errorData = new List<string>();
                errorData.Add("File read error!");
                return Task.FromResult(new List<List<string>>() { errorData });
            }
        }
    }
}
