using AutoMapper;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using CES.Infra.Models;

namespace CES.Domain.Handlers.DriverMedicalCertificate
{
    public class CreateMedicalCertificateHandler
    {
        private readonly DocMangerContext _context;
        private readonly IMapper _mapper;

        public CreateMedicalCertificateHandler(DocMangerContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<GetEmployeesByDivisionResponse> Handle(CreateMedicalCertificateRequest request, CancellationToken cancellationToken)
        {
            request.EmployeeId = _context.Employees
                .FirstOrDefault(x => x.FirstName == request.FirstName.Trim() && x.LastName == request.LastName.Trim()).Id;
            var medicalCertificate = _mapper.Map<CreateMedicalCertificateRequest, DriverMedicalCertificateEntity>(request);
            var medical = await _context.DriverMedicalCertificate.AddAsync(medicalCertificate);
            await _context.SaveChangesAsync();
            return await Task.FromResult(_mapper.Map<EmployeeEntity, GetEmployeesByDivisionResponse>(medical.Entity.Employee));
        }
    }
}
