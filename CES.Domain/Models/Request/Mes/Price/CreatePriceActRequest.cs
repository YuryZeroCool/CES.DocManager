using CES.Domain.Models.Response.Mes.Price;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Price
{
    public class CreatePriceActRequest : IRequest<CreatePriceActResponse>
    {
        public decimal Price { get; set; }
    }
}
