using CES.Domain.Models.Response.Report;
using MediatR;

namespace CES.Domain.Models.Request.Report
{
    public class GetVehicleExpenseSheetRequest : IRequest<List<List<GetVehicleExpenseSheetResponse>>>
    {
        public string? Path { get; set; }
    }
}