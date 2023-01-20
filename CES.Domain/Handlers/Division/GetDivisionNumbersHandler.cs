using AutoMapper;
using CES.Domain.Models.Request.Division;
using CES.Domain.Models.Response.Division;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Division
{
    public class GetDivisionNumbersHandler : IRequestHandler<GetDivisionNumbersRequest, IEnumerable<GetDivisionNumbersResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetDivisionNumbersHandler(DocMangerContext context, IMapper mappper)
        {
            _ctx = context;
            _mapper = mappper;
        }

        public async Task<IEnumerable<GetDivisionNumbersResponse>> Handle(GetDivisionNumbersRequest request, CancellationToken cancellationToken)
        {
            IEnumerable<DivisionEntity> data = await _ctx.Divisions.ToListAsync(cancellationToken);
            if (data == null) throw new System.Exception();
            return await Task.FromResult(_mapper.Map<IEnumerable<GetDivisionNumbersResponse>>(data));
        }
    }
}
