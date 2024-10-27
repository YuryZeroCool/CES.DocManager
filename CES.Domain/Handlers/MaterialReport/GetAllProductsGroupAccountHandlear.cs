using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetAllProductsGroupAccountHandler : IRequestHandler<GetAllProductsGroupAccountRequest, List<GetAllProductsGroupAccountResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetAllProductsGroupAccountHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetAllProductsGroupAccountResponse>> Handle(GetAllProductsGroupAccountRequest request, CancellationToken cancellationToken)
        {
            var res = await _ctx.ProductsGroupAccount.ToListAsync(cancellationToken);

            var date = new List<GetAllProductsGroupAccountResponse>();

            if (res == null) throw new ArgumentNullException(nameof(res));

            foreach (var item in res)
            {
                item.AccountName = item.AccountName;
                date.Add(_mapper.Map<GetAllProductsGroupAccountResponse>(item));
            }

            return await Task.FromResult(date);
        }
    }
}
