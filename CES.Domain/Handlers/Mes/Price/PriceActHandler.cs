//using AutoMapper;
//using CES.Domain.Models.Request.Mes.Price;
//using CES.Domain.Models.Response.Mes.Acts;
//using CES.Domain.Models.Response.Mes.Price;
//using CES.Infra;
//using MediatR;

//namespace CES.Domain.Handlers.Mes.Price
//{
//    public class PriceActHandler : IRequestHandler<CreatePriceActRequest,CreatePriceActResponse>
//    {
//        private readonly IMapper _mapper;

//        private readonly DocMangerContext _ctx;

//        public PriceActHandler(IMapper mapper, DocMangerContext ctx)
//        {
//            _mapper = mapper;
//            _ctx = ctx;
//        }

//        public Task<CreatePriceActResponse> Handle(CreatePriceActRequest request, CancellationToken cancellationToken)
//        {
//            if (_ctx.WorkNameInAct is not null && !_ctx.WorkNameInAct.Any(x => x.Id == request.WorkNameInActId))
//            {
//                var res = await _ctx.WorkNameInAct.AddAsync(new()
//                {
//                    Id = 0,
//                    Name = request.Name.Trim(),
//                    DateOfCreation = DateTime.Now,

//                }, cancellationToken);
//                await _ctx.SaveChangesAsync(cancellationToken);


//                return await Task.FromResult(_mapper.Map<CreateWorkNameInActResponse>(res.Entity));
//            }
//            throw new NotImplementedException();
//        }
//    }
//}
