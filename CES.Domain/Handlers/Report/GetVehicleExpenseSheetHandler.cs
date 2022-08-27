using AutoMapper;
using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Report;
using CES.XmlFormat;
using CES.XmlFormat.Models;
using MediatR;

namespace CES.Domain.Handlers.Report
{
    public class GetVehicleExpenseSheetHandler : IRequestHandler<GetVehicleExpenseSheetRequest, List<List<GetVehicleExpenseSheetResponse>>>
    {
        private ReadExcel _readExcel;

        private readonly IMapper _mapper;

        public GetVehicleExpenseSheetHandler(IMapper mapper)
        {
            _mapper = mapper;
        }
        public async Task<List<List<GetVehicleExpenseSheetResponse>>> Handle(GetVehicleExpenseSheetRequest request, CancellationToken cancellationToken)
        {
            List<List<GetVehicleExpenseSheetResponse>> sheetsArr = new List<List<GetVehicleExpenseSheetResponse>>();
            List<GetVehicleExpenseSheetResponse> rowArr = null;

            DirectoryInfo dirInfo = new(request.Path + "/download");
            var dirPath = request.Path + "/download/" + dirInfo.GetFiles()[0].Name;
            _readExcel = new ReadExcel(dirPath);
            //var data =  _mapper.Map<List<List<FuelWorkAccountingCard>>, List<List<VehicleExpenseSheetResponse>>>
            //(_readExcel.readExcel().ToList());
            foreach (var sheet in _readExcel.readExcel())
            {
                rowArr = new List<GetVehicleExpenseSheetResponse>();

                foreach (var row in sheet)
                {
                    rowArr.Add(_mapper.Map<FuelWorkAccountingCardEntity, GetVehicleExpenseSheetResponse>(row));
                }
                sheetsArr.Add(rowArr);
            }
            return await Task.FromResult(sheetsArr);

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
