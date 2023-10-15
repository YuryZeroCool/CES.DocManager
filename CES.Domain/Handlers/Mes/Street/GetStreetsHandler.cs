using AutoMapper;
using CES.Domain.Models.Request.Mes.Street;
using CES.Domain.Models.Response.Mes.Street;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Street
{
    public class GetStreetsHandler : IRequestHandler<GetStreetsRequest, GetStreetsResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetStreetsHandler( DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<GetStreetsResponse> Handle(GetStreetsRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.Streets != null)
            {
                if(!string.IsNullOrEmpty(request.Street))
                {
                    if (await _ctx.Streets.CountAsync(cancellationToken) == 0)
                        throw new System.Exception("Улицы не найдены");
                    var res = await _ctx.Streets
                        .FirstOrDefaultAsync(x => x.Name
                            .ToUpper()
                            .Trim()
                            .TrimEnd()
                            .Contains(request.Street
                                .ToUpper()
                                .Trim()
                                .TrimEnd()
                                )
                            );
                    return res is null ? throw new System.Exception("Улица не найдена")
                        : await Task.FromResult(_mapper.Map<GetStreetsResponse>(res));
                }
            }
            throw new NotImplementedException();
        }
    }
}
