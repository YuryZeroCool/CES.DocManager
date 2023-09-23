using AutoMapper;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Mes.Acts;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class GetWorkNameInActHandler : IRequestHandler<WorkNameInActRequest, List<WorkNameInActResponse>>
    {
        public readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetWorkNameInActHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<WorkNameInActResponse>> Handle(WorkNameInActRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.WorkNameInAct is not null)
            {
                //var db = await _ctx.WorkNameInAct.Include(x => x.PricesOfWorkInAct).ToListAsync(cancellationToken);
                //var s = db;
                
            }

            throw new NotImplementedException();
        }
    }
}
