namespace CES.Domain.Models.Response.CommonInfo
{
    public class GetAllCommonInfoResponse
    {
        public int Id { get; set; }

        public string? Division { get; set; }

        public List<GetCommonInfoResponse>? CommonInfo { get; set; }

        public GetAllCommonInfoResponse()
        {
            CommonInfo = new List<GetCommonInfoResponse>();
        }
    }
}
