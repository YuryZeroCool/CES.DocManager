using MediatR;
using System.Collections.Generic;

namespace CES.Domain.Models.Request.Report
{
    public class VehicleExpenseSheetRequest : IRequest<List<List<string>>>
    {
        public string Path { get; set; }
    }
}
