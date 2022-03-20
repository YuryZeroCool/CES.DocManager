using CES.Domain.Models.Response.Report;
using MediatR;
using System.Collections.Generic;

namespace CES.Domain.Models.Request.Report
{
    public class VehicleExpenseSheetRequest : IRequest<List<List<VehicleExpenseSheetResponse>>>
    {
        public string Path { get; set; }
    }
}
