using CES.Domain.Models.Response.Mes.HouseNumbers;
using MediatR;

namespace CES.Domain.Models.Request.Mes.HouseNumbers
{
    public class CreateHouseNumberRequest : IRequest<CreateHouseNumberResponse>
    {
        public string? HouseNumber { get; set; }
    }
}
