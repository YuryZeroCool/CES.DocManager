using AutoMapper;
using CES.Domain.Models.Request.Vehicle;
using CES.Domain.Models.Response.Vehicle;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Vehicle
{
    public class GetAllBrandsHandler : IRequestHandler<GetAllBransRequest, List<GetAllBrandsResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetAllBrandsHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetAllBrandsResponse>> Handle(GetAllBransRequest request, CancellationToken cancellationToken)
        {
            var date =  await _ctx.VehicleBrands.Select(p => _mapper.Map<GetAllBrandsResponse>(p)).ToListAsync();
            if (date == null) throw new System.Exception("Error");
            return await Task.FromResult(date);
        }
    }
}
