using MediatR;

namespace CES.Domain.Models.Request.Vehicle
{
    public class GetEnshrinedByCarMaterialRequest : IRequest<int>
    {
        public string? Model { get; set; }

        public string? NumberOfPlate { get; set; }
    }
}
