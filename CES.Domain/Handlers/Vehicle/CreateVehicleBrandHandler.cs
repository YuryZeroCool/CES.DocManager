using System.Net;
using AutoMapper;
using CES.Domain.Exception;
using CES.Domain.Models.Request.Vehicle;
using CES.Domain.Models.Response.Vehicle;
using CES.Infra;
using CES.Infra.Models;
using MediatR;

namespace CES.Domain.Handlers.Vehicle
{
    public class CreateVehicleBrandHandler : IRequestHandler<CreateVehicleBrandRequest, VehicleBrandResponse>
    {
        private readonly DocMangerContext _docMangerContext;
        private readonly IMapper _mapper;

        public CreateVehicleBrandHandler(DocMangerContext ctx, IMapper mapper)
        {
            _docMangerContext = ctx;
            _mapper = mapper;
        }
        public async Task<VehicleBrandResponse> Handle(CreateVehicleBrandRequest request, CancellationToken cancellationToken)
        {
            if (request.Brand == "") throw  new RestException(HttpStatusCode.BadRequest, "Переданы некорректные даные");
            if (_docMangerContext.VehicleBrands.Any(p => p.Name == request.Brand))
                throw new RestException(HttpStatusCode.OK, "Такой бренд существует");
            _docMangerContext.VehicleBrands.Add(_mapper.Map<CreateVehicleBrandRequest, VehicleBrandEntity>(request));
            await _docMangerContext.SaveChangesAsync();

            var brand = _docMangerContext.VehicleBrands.FirstOrDefault(p => p.Name == request.Brand);
            return  await Task.FromResult(_mapper.Map<VehicleBrandEntity, VehicleBrandResponse>(brand));
        }
    }
}
