using CES.Domain.Models.Request.Vehicle;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Vehicle
{
    public class GetCarByCarNumberHandler : IRequestHandler<GetCarByCarNumberRequest, List<string>>
    {
        private readonly DocMangerContext _ctx;

        public GetCarByCarNumberHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<string>> Handle(GetCarByCarNumberRequest request, CancellationToken cancellationToken)
        {
            if (_ctx is not null
                && _ctx.NumberPlateOfCar is not null
                && request is not null)
            {
                var car = await _ctx.NumberPlateOfCar
                      .Where(x => x.Number!.Contains(request.CarNumber) && x.IsActive)
                      .Include(p => p.VehicleModel)
                      .ThenInclude(k => k!.VehicleBrand)
                      .ToListAsync(cancellationToken);

                if (car is not null)
                {
                    return await Task.FromResult(car.Select(p =>
                    string.Concat(
                        p.VehicleModel!.VehicleBrand!.Name,
                        " ",
                        p.VehicleModel!.Name!,
                        " ",
                         $"({p.Number!.Trim()})"))
                        .ToList());
                }
            }

            throw new NotImplementedException();
        }
    }
}
