using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class GetUnitsRequest : IRequest<List<CES.Domain.Models.Unit>>
    {}
}
