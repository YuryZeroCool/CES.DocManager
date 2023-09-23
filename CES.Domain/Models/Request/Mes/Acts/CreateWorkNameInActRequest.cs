using CES.Domain.Models.Response.Mes.Acts;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Acts
{
    public class CreateWorkNameInActRequest : IRequest<CreateWorkNameInActResponse>
    {
        public string? Name { get; set; }

        public decimal? Price { get; set; }
    }
}
