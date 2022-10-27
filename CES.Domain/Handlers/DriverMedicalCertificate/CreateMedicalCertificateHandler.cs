using AutoMapper;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using CES.Infra.Models;
using CES.Infra.Models.Drivers;
using MediatR;

namespace CES.Domain.Handlers.DriverMedicalCertificate
{
    public class CreateMedicalCertificateHandler: IRequestHandler<CreateMedicalCertificateRequest, GetEmployeesByDivisionResponse>
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
               request.FirstName = request.FirstName?.Trim();
               request.LastName = request.LastName?.Trim();
                var res = _context.Employees 
           .FirstOrDefault(x => x.FirstName == request.FirstName && x.LastName == request.LastName);

            if (res == null) throw new System.Exception("Error");

            if(res is not null) request.EmployeeId = res.Id;

            var medicalCertificate = _mapper.Map<CreateMedicalCertificateRequest, DriverMedicalCertificateEntity>(request);
            var medical = await _context.DriverMedicalCertificate.AddAsync(medicalCertificate, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            if (medical.Entity.Employee is not null)
            {
                return await Task.FromResult(_mapper.Map<EmployeeEntity, GetEmployeesByDivisionResponse>(medical.Entity.Employee));
            }
            throw new System.Exception("Error");
        }
    }
}
