using CES.Domain.Models.Response.Mes.Street;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Street
{
    public class CreateStreetRequest : IRequest<CreateStreetResponse>
    {
        public string Street { get; set; }
    }
}
