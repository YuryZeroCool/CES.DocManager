using CES.Domain.Models.Response.Vehicle;
using MediatR;

namespace CES.Domain.Models.Request.Vehicle
{
    public class CreateVehicleBrandRequest : IRequest<GetVehicleBrandResponse>
    {
        public  string? Brand { get; set; }
    }
}
