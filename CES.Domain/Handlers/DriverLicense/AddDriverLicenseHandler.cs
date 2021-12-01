using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CES.Domain.Models.Request.DriverLicense;
using CES.Infra;
using CES.Infra.Models;
using MediatR;

namespace CES.Domain.Handlers.DriverLicense
{
    public class AddDriverLicenseHandler : IRequestHandler<CreateDriverLicenseRequest>
    {
        private readonly DocMangerContext _context;
        private readonly IMapper _mapper;


        public AddDriverLicenseHandler( DocMangerContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(CreateDriverLicenseRequest request, CancellationToken cancellationToken)
        {
            request.EmployeeId = _context.Employees
                .FirstOrDefault(x => x.FirstName == request.FirstName && x.LastName == request.LastName).Id;
            var license = _mapper.Map<CreateDriverLicenseRequest, DriverLicenseEntity>(request);
            await _context.DriverLicenses.AddAsync(license);
            await _context.SaveChangesAsync();
            return await Task.FromResult(new Unit());
        }
    }
}
