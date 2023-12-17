using AutoMapper;
using CES.Domain.Models.Request.Mes.Street;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Street
{
    public class GetStreetsHandler : IRequestHandler<GetStreetsRequest, List<string>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetStreetsHandler( DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<List<string>> Handle(GetStreetsRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.Streets != null)
            {
                if(!string.IsNullOrEmpty(request.Value))
                {
                    if (await _ctx.Streets.CountAsync(cancellationToken) == 0)
                        throw new System.Exception("Улицы не найдены");
                    var data = await _ctx.Streets
                        .Where(x => x.Name
                            .ToUpper()
                            .Trim()
                            .Contains(request.Value
                                .ToUpper()
                                .Trim())
                            )
                        .ToListAsync(cancellationToken);
                    return data is null ? throw new System.Exception("Улица не найдена")
                        : await Task.FromResult(data.Select(p=>p.Name).ToList());
                }
                else
                {
                    return new List<string>();
                }
            }
            throw new NotImplementedException();
        }
    }
}
