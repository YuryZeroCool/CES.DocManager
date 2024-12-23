﻿using CES.Domain.Models.Request.Vehicle;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.MaterialReport
{
    public class GetEnshrinedByCarMaterialHandler : IRequestHandler<GetEnshrinedByCarMaterialRequest, int>
    {
        private readonly DocMangerContext _ctx;

        public GetEnshrinedByCarMaterialHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public Task<int> Handle(GetEnshrinedByCarMaterialRequest request, CancellationToken cancellationToken)
        {
            var materials = _ctx.EnshrinedMaterial
                 .Where(x => x.VehicleModel == request.Model && x.NumberPlateCar == request.NumberOfPlate);

            if (materials == null || !materials.Any()) throw new System.Exception("Упс! Что-то пошло не так");

            throw new NotImplementedException();
        }
    }
}
