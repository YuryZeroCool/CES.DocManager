using CES.Domain.Models.Response.MaterialReport;
using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class AddEnshrinedMaterialRequest : IRequest<AddEnshrinedMaterialResponse>
    {
        public string? Party { get; set; }

        public double Count { get; set; }

        public string? NumberPlateOfCar { get; set; }

        public string? Brand { get; set; }
    }
}
