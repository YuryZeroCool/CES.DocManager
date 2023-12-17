using CES.Domain.Models.Response.Mes.Street;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Street
{
    public class GetStreetsRequest : IRequest <List<string>>
    {
        public string Value { get; set; }
    }
}
