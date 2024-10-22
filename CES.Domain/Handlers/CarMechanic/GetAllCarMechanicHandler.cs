using AutoMapper;
using CES.Domain.Models.Request.CarMechanic;
using CES.Domain.Models.Response.CarMechanic;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.CarMechanic
{
    public class GetAllMechanicHandler : IRequestHandler<GetAllCarMechanicRequest, List<GetAllCarMechanicResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetAllMechanicHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<List<GetAllCarMechanicResponse>> Handle(GetAllCarMechanicRequest request, CancellationToken cancellationToken)
        {
            var res = await _ctx.CarMechanics.Where(p=>p.IsActive).ToListAsync(cancellationToken);
            if (res == null) throw new System.Exception("Упс! Что-то пошло не так");

            return await Task.FromResult(res.Select(p => _mapper.Map<GetAllCarMechanicResponse>(p)).ToList());
        }
    }
}
