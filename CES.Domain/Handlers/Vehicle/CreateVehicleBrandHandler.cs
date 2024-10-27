using AutoMapper;
using CES.Domain.Exception;
using CES.Domain.Models.Request.Vehicle;
using CES.Domain.Models.Response.Vehicle;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CES.Domain.Handlers.Vehicle
{
    public class CreateVehicleBrandHandler : IRequestHandler<CreateVehicleBrandRequest, GetVehicleBrandResponse>
    {
        private readonly DocMangerContext _ctx;
        private readonly IMapper _mapper;

        public CreateVehicleBrandHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<GetVehicleBrandResponse> Handle(CreateVehicleBrandRequest request, CancellationToken cancellationToken)
        {
            if (request.Brand == "") throw new RestException(HttpStatusCode.BadRequest, "Переданы некорректные даные");
            if (_ctx.VehicleBrands.Any(p => p.Name == request.Brand))
                throw new RestException(HttpStatusCode.OK, "Такой бренд существует");
            _ctx.VehicleBrands.Add(_mapper.Map<CreateVehicleBrandRequest, VehicleBrandEntity>(request));
            await _ctx.SaveChangesAsync(cancellationToken);

            var brand = await _ctx.VehicleBrands.FirstOrDefaultAsync(p =>
                p.Name == request.Brand, cancellationToken);
            if (brand == null) throw new System.Exception("Упс! Что-то пошло не так");

            return await Task.FromResult(_mapper.Map<VehicleBrandEntity, GetVehicleBrandResponse>(brand));
        }
    }
}
