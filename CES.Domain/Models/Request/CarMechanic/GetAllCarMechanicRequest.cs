using CES.Domain.Models.Response.CarMechanic;
using MediatR;

namespace CES.Domain.Models.Request.CarMechanic
{
    public class GetAllCarMechanicRequest : IRequest<List<GetAllCarMechanicResponse>> { }
}
