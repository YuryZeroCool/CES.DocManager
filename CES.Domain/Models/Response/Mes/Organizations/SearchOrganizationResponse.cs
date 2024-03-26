namespace CES.Domain.Models.Response.Mes.Organizations
{
    public class SearchOrganizationResponse
    {
        public int TotalPage { get; set; }

        public List<CreateOrganizationResponse>? Organizations { get; set; }
    }
}
