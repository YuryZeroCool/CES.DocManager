using AutoMapper;
using CES.Domain.Models.Request.Mes.HouseNumbers;
using CES.Domain.Models.Response.Mes.HouseNumbers;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.HouseNumbers
{
    public class GetHouseNumbersHandler : IRequestHandler<GetHouseNumbersRequest, List<GetHouseNumbersResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetHouseNumbersHandler(DocMangerContext ctx, IMapper mapper) 
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetHouseNumbersResponse>> Handle(GetHouseNumbersRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.HouseNumbers != null)
            {
                if (!string.IsNullOrEmpty(request.Value))
                {
                    if (await _ctx.HouseNumbers.CountAsync(cancellationToken) == 0)
                        throw new System.Exception(" Номер дома не найдены");
                    var res = await _ctx.HouseNumbers
                        .Where(x => x.Number
                            .ToUpper()
                            .Trim()
                            .Contains(request.Value
                                .ToUpper()
                                .Trim())
                            )
                        .ToListAsync();
                    return res is null ? throw new System.Exception("Номер дома не найдена")
                        : await Task.FromResult(_mapper.Map<List<GetHouseNumbersResponse>>(res));
                }
            }
            throw new NotImplementedException();
        }
    }
}
