using AutoMapper;
using CES.Domain.Models;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using CES.Infra.Models.MaterialReport;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.Formula.Functions;
using System.Linq;

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
            if(request.Accounts != null)
            {
                var arrAccounts = request.Accounts.Split(", ").ToList();
                if (arrAccounts == null) throw new System.Exception("Error");
                var totalMaterials = new List<GetTotalMaterialsResponse>();

                foreach (var item in arrAccounts)
                {
                    var products = from p in _ctx.ProductsGroupAccount
                                   where p.AccountName == item
                                   from pr in _ctx.Products
                                   where pr.ProductGroupAccountId == p.Id
                                   orderby pr.Name ascending
                                   join unit in _ctx.Units on pr.UnitId equals unit.Id
                                   select new GetTotalMaterialsResponse()
                                   {
                                       Name = pr.Name,
                                       Unit = unit.Name,
                                       Id = pr.Id,
                                       Party = pr.Parties!.Select(s => _mapper.Map<PartyEntity, PartyModel>(s)),
                                   };
                    totalMaterials = totalMaterials.Union(products).ToList();
                }


                return await Task.FromResult(totalMaterials);
            }
            throw new SystemException("Error");
        }
    }
}
