namespace CES.Domain.Models.Response.MaterialReport
{
    public class GetTotalMaterialsResponse
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public IEnumerable<PartyModel>? Party { get; set; }  
        
        public string? Unit { get; set; }
    }
}
