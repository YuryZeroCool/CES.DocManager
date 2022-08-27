using CES.Domain.Models.Response.Division;
using MediatR;

namespace CES.Domain.Models.Request.Division
{
    public class GetDivisionNumbersRequest : IRequest<IEnumerable<GetDivisionNumbersResponse>> { }
}
