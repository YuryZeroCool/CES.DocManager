using CES.Domain.Models.Response.Vehicle;
using MediatR;

namespace CES.Domain.Models.Request.Vehicle
{
    public class GetAllNumbersPalteRequest : IRequest<List<GetAllNumbersPlateResponse>>
    {
        public string? Brand { get; set; }
    }
}
