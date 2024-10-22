using AutoMapper;
using CES.Domain.Models.Request.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.MaterialReport
{
    internal class GetUnitsHandler : IRequestHandler<GetUnitsRequest, List<CES.Domain.Models.Unit>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetUnitsHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;

            _mapper = mapper;
        }
        public async Task<List<CES.Domain.Models.Unit>> Handle(GetUnitsRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.Units is not null)
            {
              return await Task.FromResult(_mapper.Map<List<CES.Domain.Models.Unit>>( await _ctx.Units.ToListAsync(cancellationToken)));
            }
            throw new System.Exception("Упс! Что-то пошло не так");
        }
    }
}
