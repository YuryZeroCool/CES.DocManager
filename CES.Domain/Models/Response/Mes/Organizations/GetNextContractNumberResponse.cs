namespace CES.Domain.Models.Response.Mes.Organizations
{
    public class GetNextContractNumberResponse
    {
        public bool Exist { get; set; }

        public string? NextContractNumber { get; set; }
    }
}