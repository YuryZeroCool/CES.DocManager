using CES.Domain.Models.Response.MaterialReport;
using MediatR;

namespace CES.Domain.Models.Request.MaterialReport
{
    public class GetAllProductsGroupAccountRequest : IRequest<List<GetAllProductsGroupAccountResponse>> { }
}
