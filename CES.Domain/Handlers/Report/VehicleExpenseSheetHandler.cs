using AutoMapper;
using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Report;
using CES.XmlFormat;
using CES.XmlFormat.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CES.Domain.Handlers.Report
{
    public class VehicleExpenseSheetHandler : IRequestHandler<VehicleExpenseSheetRequest, List<List<VehicleExpenseSheetResponse>>>
    {
        private ReadExcel _readExcel;

        private readonly IMapper _mapper;

        public VehicleExpenseSheetHandler( IMapper mapper)
        {
            _mapper = mapper;
        }
        public async Task<List<List<VehicleExpenseSheetResponse>>> Handle(VehicleExpenseSheetRequest request, CancellationToken cancellationToken)
        {
            List<List<VehicleExpenseSheetResponse>> sheetsArr = new List<List<VehicleExpenseSheetResponse>>();
            List<VehicleExpenseSheetResponse> rowArr = null;

            DirectoryInfo dirInfo = new(request.Path + "/download");
            var dirPath = request.Path + "/download/" + dirInfo.GetFiles()[0].Name;
            _readExcel = new ReadExcel(dirPath);
            //var data =  _mapper.Map<List<List<FuelWorkAccountingCard>>, List<List<VehicleExpenseSheetResponse>>>
            //(_readExcel.readExcel().ToList());
            foreach (var sheet in _readExcel.readExcel())
            {
                rowArr = new List<VehicleExpenseSheetResponse>();

                foreach (var row in sheet)
                {
                    rowArr.Add(_mapper.Map<FuelWorkAccountingCard, VehicleExpenseSheetResponse>(row));
                }
                sheetsArr.Add(rowArr);
            }
            return await  Task.FromResult(sheetsArr);
            
            //catch (IndexOutOfRangeException)
            //{
            //    List<string> errorData = new List<string>();
            //    errorData.Add("folder is empty");
            //    return Task.FromResult(new List<List<string>>() { errorData });
            //}
            //catch (System.Exception)
            //{
            //    List<string> errorData = new List<string>();
            //    errorData.Add("File read error!");
            //    return Task.FromResult(new List<List<string>>() { errorData });
            //}
        }
    }
}
