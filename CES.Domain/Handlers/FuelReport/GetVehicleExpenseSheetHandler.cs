using AutoMapper;
using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Report;
using CES.XmlFormat;
using CES.XmlFormat.Models;
using MediatR;

namespace CES.Domain.Handlers.FuelReport
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

            foreach (var sheet in _readExcel.ReadExcelDocument())
            {
                rowArr = new List<GetVehicleExpenseSheetResponse>();

                foreach (var row in sheet)
                {
                    rowArr.Add(_mapper.Map<FuelWorkAccountingCardEntity, GetVehicleExpenseSheetResponse>(row));
                }
                sheetsArr.Add(rowArr);
            }

            return await Task.FromResult(sheetsArr);
        }
    }
}
