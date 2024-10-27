using CES.Domain.Models.Request.Employee;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Employees
{
    public class GetEmployeeByCarNumberHandler : IRequestHandler<GetEmployeeByCarNumberRequest, List<string>>
    {
        private readonly DocMangerContext _ctx;

        public GetEmployeeByCarNumberHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<string>> Handle(GetEmployeeByCarNumberRequest request, CancellationToken cancellationToken)
        {
            if (_ctx.NumberPlateOfCar is not null && _ctx.Employees is not null)
            {
                var numberCar = await _ctx.NumberPlateOfCar
                     .FirstOrDefaultAsync(x => x.Number!.Trim() == request.CarNumber.Trim(), cancellationToken);

                if (numberCar is not null)
                {
                    var data = await _ctx.Employees
                        .Where(x => x.CarNumber == numberCar)
                        .ToListAsync(cancellationToken);

                    return await Task.FromResult(data.Select(p => p.LastName + " " + p.FirstName).ToList());
                }
            }
            throw new NotImplementedException();
        }
    }
}
