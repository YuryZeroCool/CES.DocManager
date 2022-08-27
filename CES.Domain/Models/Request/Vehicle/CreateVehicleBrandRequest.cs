using CES.Domain.Models.Response.Vehicle;
using MediatR;

namespace CES.Domain.Models.Request.Vehicle
{
    public class CreateVehicleBrandRequest : IRequest<VehicleBrandResponse>
    {
        public  string? Brand { get; set; }
    }
}
