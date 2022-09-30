using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetAllProductsGroupAccountHandlear : IRequestHandler<GetAllProductsGroupAccountRequest, List<GetAllProductsGroupAccountResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetAllProductsGroupAccountHandlear(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetAllProductsGroupAccountResponse>> Handle(GetAllProductsGroupAccountRequest request, CancellationToken cancellationToken)
        {
           var res =  await _ctx.ProductsGroupAccount.ToListAsync(cancellationToken);

            var date =  new List<GetAllProductsGroupAccountResponse>();

           if (res == null)    throw new ArgumentNullException(nameof(res));

            foreach (var item in res)
            {
                if(item != null)
                {
                   item.AccountName = item.AccountName?.Trim();
                  date.Add(_mapper.Map<GetAllProductsGroupAccountResponse>(item));
                }
            }

            return await Task.FromResult(date);
        }
    }
}
