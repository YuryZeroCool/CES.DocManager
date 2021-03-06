using System.Threading;
using System.Threading.Tasks;
using CES.Domain.Models.Request.DriverLicense;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.DriverLicense
{
    public class IsPersonalSerialNumberRequestHandler : IRequestHandler<IsPersonalSerialNumberRequest, bool>
    {
        private readonly DocMangerContext _context;

        public IsPersonalSerialNumberRequestHandler(DocMangerContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(IsPersonalSerialNumberRequest request, CancellationToken cancellationToken)
        {
            var serialNumber = await _context.DriverLicenses.FirstOrDefaultAsync(x => x.SerialNumber == request.SerialNumber);
            return await Task.FromResult(serialNumber != null ? true : false);
        }
    }
}
