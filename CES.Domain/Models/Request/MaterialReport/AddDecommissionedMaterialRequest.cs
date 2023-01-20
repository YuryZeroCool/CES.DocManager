using CES.Domain.Models.Response.MaterialReport;
using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class AddDecommissionedMaterialRequest : IRequest<AddDecommissionedMaterialResponse>
    {
        public string? CarMechanic { get; set; }    

        public DateTime CurrentDate { get; set; }   

        public List<AddDecommissionedMaterial>? Materials { get; set; }  
    }
}
