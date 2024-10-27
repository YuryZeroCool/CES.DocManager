using AutoMapper;
using CES.Domain.Models.Request.Vehicle;
using CES.Domain.Models.Response.Vehicle;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Vehicle
{
    public class GetAllNumbersPlateHandler : IRequestHandler<GetAllNumbersPalteRequest, List<GetAllNumbersPlateResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

        public GetAllNumbersPlateHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetAllNumbersPlateResponse>> Handle(GetAllNumbersPalteRequest request, CancellationToken cancellationToken)
        {
            var brand = await _ctx.VehicleBrands.FirstOrDefaultAsync(x => x.Name == request.Brand, cancellationToken);

            if (brand == null) throw new System.Exception("Упс! Что-то пошло не так");

            var models = await _ctx.VehicleModels
                .Where(x => x.VehicleBrand == brand).ToListAsync(cancellationToken);

            if (models == null) throw new System.Exception("Упс! Что-то пошло не так");

            var date = new List<GetAllNumbersPlateResponse>();

            foreach (var item in models)
            {
                IEnumerable<GetAllNumbersPlateResponse> second = _ctx.NumberPlateOfCar.Where(p => p.VehicleModel == item).
                                       Select(p => _mapper.Map<GetAllNumbersPlateResponse>(p));

                date = date.Union(second).ToList();
            }
            return await Task.FromResult(date);
        }
    }
}
