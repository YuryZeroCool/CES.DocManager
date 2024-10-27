using AutoMapper;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using CES.Infra.Models;
using CES.Infra.Models.Drivers;
using MediatR;

namespace CES.Domain.Handlers.DriverMedicalCertificate
{
    public class CreateMedicalCertificateHandler : IRequestHandler<CreateMedicalCertificateRequest, GetEmployeesByDivisionResponse>
    {
        private readonly DocMangerContext _ctx;
        private readonly IMapper _mapper;

        public CreateMedicalCertificateHandler(DocMangerContext context, IMapper mapper)
        {
            _ctx = context;
            _mapper = mapper;
        }
        public async Task<GetEmployeesByDivisionResponse> Handle(CreateMedicalCertificateRequest request, CancellationToken cancellationToken)
        {
            request.FirstName = request.FirstName?.Trim();
            request.LastName = request.LastName?.Trim();
            var res = _ctx.Employees
                .FirstOrDefault(x => x.FirstName == request.FirstName && x.LastName == request.LastName);

            if (res == null) throw new System.Exception("Упс! Что-то пошло не так");

            request.EmployeeId = res.Id;

            var medicalCertificate = _mapper.Map<CreateMedicalCertificateRequest, DriverMedicalCertificateEntity>(request);
            var medical = await _ctx.DriverMedicalCertificate.AddAsync(medicalCertificate, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);

            if (medical.Entity.Employee != null)
            {
                return await Task.FromResult(_mapper.Map<EmployeeEntity, GetEmployeesByDivisionResponse>(medical.Entity.Employee));
            }
            throw new System.Exception("Упс! Что-то пошло не так");
        }
    }
}
