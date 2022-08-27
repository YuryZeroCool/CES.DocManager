using CES.Domain.Models.Request.MaterialReport;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetMaterialHandler : IRequestHandler<GetTotalProductRequest, GetTotalProductResponse>
    {
        private readonly DocMangerContext _ctx;

        public  GetMaterialHandler (DocMangerContext ctx)
        { 
            _ctx = ctx;
        }

        public async Task<GetTotalProductResponse> Handle(GetTotalProductRequest request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(new GetTotalProductResponse()
            {
                Count = _ctx.Parties.Select(p => p.Count).AsEnumerable().Aggregate((x, y) => x + y),
                Sum = (await _ctx.Parties.Select(p => p).ToListAsync()).Sum(item => (decimal)item.Count * item.Price)
            });
        }
    }
}
