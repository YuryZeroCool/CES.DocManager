using MediatR;

namespace CES.Domain.Models.Request.Employee
{
    public class GetIsValidNumberNumberRequest : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
