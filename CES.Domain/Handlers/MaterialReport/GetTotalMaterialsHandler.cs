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
using AutoMapper;
using CES.Domain.Models;
using CES.Infra.Models.MaterialReport;
using System.Collections.ObjectModel;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetTotalMaterialsHandler : IRequestHandler<GetTotalMaterialsRequest, List<GetTotalMaterialsResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public  GetTotalMaterialsHandler (DocMangerContext ctx, IMapper mapper)
        { 
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetTotalMaterialsResponse>> Handle(GetTotalMaterialsRequest request, CancellationToken cancellationToken)
        {
            var accountProductId = await _ctx.ProductsGroupAccount.FirstOrDefaultAsync(p => p.AccountName.Trim() == request.Account.Trim());
           return  await  _ctx.Products.Where(p => p.ProductGroupAccountId == accountProductId.Id)
                .Join(
                _ctx.Units,
                p=> p.UnitId,
                c=>c.Id,
                (p,c)=> new GetTotalMaterialsResponse()
                {
                    Id= p.Id,
                    Party= p.Parties.Select(p=>_mapper.Map<PartyEntity, PartyModel>(p)),
                    Name= p.Name,
                    Unit = c.Name
                }).ToListAsync();
        }
    }
}
