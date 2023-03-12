using CES.Domain.Models.Response.FuelReport;
using MediatR;

namespace CES.Domain.Models.Request.FuelReport
{
    public class GetAllWorkCardsRequest : IRequest<List<GetAllWorkCardsResponse>>
    {
        public int Month { get; set; }

         public int Year { get; set; }
    }
}
