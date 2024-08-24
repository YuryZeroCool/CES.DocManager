using CES.Domain.Models.Response.MaterialReport;
using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class AddMaterialRequest : IRequest<AddMaterialResponse>
    {
        public string Name {get;set;} = string.Empty;

        public int UnitId { get;set;}

        public int ProductGroupAccountId{get;set;}

        public string    partyName { get;set;} = string.Empty;

        public string  PartyDate { get;set;} = string.Empty;

        public double Count { get; set; }

        public decimal Price { get; set; }
    }
}
