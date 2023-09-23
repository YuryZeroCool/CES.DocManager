using AutoMapper;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Mes.Acts;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class CreateWorkNameInActHandler : IRequestHandler<CreateWorkNameInActRequest, CreateWorkNameInActResponse>
    {
        private readonly IMapper _mapper;

        private readonly DocMangerContext _ctx;

        public CreateWorkNameInActHandler(IMapper mapper, DocMangerContext ctx)
        {
            _mapper = mapper;
            _ctx = ctx;
        }

        public async Task<CreateWorkNameInActResponse> Handle(CreateWorkNameInActRequest request, CancellationToken cancellationToken)
        {
          
            //if (!decimal.TryParse(request.Price.ToString(), out decimal price)) throw new System.Exception("Error");

            //if(_ctx.PricesOfWorkInAct is not null && !await _ctx.PricesOfWorkInAct.AnyAsync(x => x.Price == request.Price, cancellationToken: cancellationToken))
            //{
            //    await _ctx.PricesOfWorkInAct.AddAsync(new()
            //    {
            //        Price = price
            //    }, cancellationToken);
            //    await _ctx.SaveChangesAsync(cancellationToken);
            //}

            //if (request.Name is not null && _ctx.WorkNameInAct is not null && !await _ctx.WorkNameInAct.AnyAsync(x => x.Name == request.Name))
            //{
            //    await _ctx.WorkNameInAct.AddAsync(new()
            //    {
            //        Name = request.Name.Trim(),
            //        DateOfCreation = DateTime.Now,
            //    }, cancellationToken);
            //    await _ctx.SaveChangesAsync(cancellationToken);
            //}

            //if (_ctx.WorkNameInAct is not null && _ctx.PricesOfWorkInAct is not null)
            //{
            //    //var work = _ctx.WorkNameInAct.Include(x => x.PricesOfWorkInAct).FirstOrDefault(x => x.Name == request.Name);
            //    //var res = _ctx.PricesOfWorkInAct.FirstOrDefault(x => x.Price == request.Price);
            //    if (work is not null && res is not null ) 
            //    {
            //         work.PricesOfWorkInAct.Add(res);
            //         await _ctx.SaveChangesAsync(cancellationToken);
            //        return new CreateWorkNameInActResponse()
            //        {
            //            CreatedAct = work.DateOfCreation,
            //            Id = work.Id,
            //            Name = work.Name,
            //            Price = price
            //        };
            //    }
            //}
            throw new NotImplementedException();
        }
    }
}
