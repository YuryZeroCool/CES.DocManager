using CES.Domain.Models.Request.DriverLicense;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.DriverLicense
{
    public class IsPersonalSerialNumberRequestHandler : IRequestHandler<GetIsPersonalSerialNumberRequest, bool>
    {
        private readonly DocMangerContext _ctx;

        public IsPersonalSerialNumberRequestHandler(DocMangerContext context)
        {
            _ctx = context;
        }
        public async Task<bool> Handle(GetIsPersonalSerialNumberRequest request, CancellationToken cancellationToken)
        {
            var serialNumber = await _ctx.DriverLicenses.FirstOrDefaultAsync(x =>
                x.SerialNumber == request.SerialNumber, cancellationToken);
            return await Task.FromResult(serialNumber != null);
        }
    }
}
