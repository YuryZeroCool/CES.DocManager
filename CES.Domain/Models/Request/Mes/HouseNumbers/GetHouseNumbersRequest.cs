using CES.Domain.Models.Response.Mes.HouseNumbers;
using MediatR;

namespace CES.Domain.Models.Request.Mes.HouseNumbers
{
    public class GetHouseNumbersRequest : IRequest<List<GetHouseNumbersResponse>>
    {
        public string Value { get; set; }
    }
}
