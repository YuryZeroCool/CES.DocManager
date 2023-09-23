using MediatR;

namespace CES.Domain.Models.Request.Mes.Acts
{
    public class GetActDataFromFileRequest : IRequest<string>
    {
        public string FileName { get; set; } = "";
    }
}
