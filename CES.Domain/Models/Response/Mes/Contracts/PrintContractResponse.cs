namespace CES.Domain.Models.Response.Mes.Contracts
{
    public class PrintContractResponse
    {
        public byte[] FileContent { get; set; } = Array.Empty<byte>();

        public string FileName { get; set; } = string.Empty;

        public string ContentType { get; set; } = "application/msword";
    }
}
