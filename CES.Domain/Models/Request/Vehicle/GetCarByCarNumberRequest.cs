using CES.Domain.Models.Response.Vehicle;
using MediatR;

namespace CES.Domain.Models.Request.Vehicle
{
    public class GetCarByCarNumberRequest : IRequest<List<string>>
    {
        public string CarNumber { get; set; } = string.Empty;

    }
}
