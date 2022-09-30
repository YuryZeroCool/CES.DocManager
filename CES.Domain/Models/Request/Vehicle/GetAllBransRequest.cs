using CES.Domain.Models.Response.Vehicle;
using MediatR;

namespace CES.Domain.Models.Request.Vehicle
{
    public class GetAllBransRequest : IRequest< List<GetAllBrandsResponse>> { }
}
