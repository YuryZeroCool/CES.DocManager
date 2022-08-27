using CES.Domain.Models.Response.Division;
using MediatR;

namespace CES.Domain.Models.Request.Division
{
    public class CreateDivisionRequest : IRequest<GetDivisionNumbersResponse>
    {
        public  string? DivisionName { get; set; }
    }
}
