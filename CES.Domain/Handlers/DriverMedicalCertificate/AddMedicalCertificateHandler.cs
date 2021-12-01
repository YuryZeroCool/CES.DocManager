using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using CES.Infra;
using CES.Infra.Models;
using MediatR;

namespace CES.Domain.Handlers.DriverMedicalCertificate
{
    class AddMedicalCertificateHandler : IRequestHandler<CreateMedicalCertificateRequest>
    {
        private readonly DocMangerContext _context;
        private readonly IMapper _mapper;

        public AddMedicalCertificateHandler(DocMangerContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Unit> Handle(CreateMedicalCertificateRequest request, CancellationToken cancellationToken)
        {
            request.EmployeeId = _context.Employees
               .FirstOrDefault(x => x.FirstName == request.FirstName && x.LastName == request.LastName).Id;
            var medicalCertificate = _mapper.Map<CreateMedicalCertificateRequest,DriverMedicalCertificateEntity>(request);
            await _context.DriverMedicalCertificate.AddAsync(medicalCertificate);
            await _context.SaveChangesAsync();
            return await Task.FromResult(new Unit());
        }
    }
}
