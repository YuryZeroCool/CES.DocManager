using AutoMapper;
using CES.Domain.Exception;
using CES.Domain.Models.Request.DriverLicense;
using CES.Domain.Models.Response.DriverLicense;
using CES.Infra;
using CES.Infra.Models.Drivers;
using MediatR;
using System.Net;

namespace CES.Domain.Handlers.DriverLicense
{
    public class CreateDriverLicenseHandler : IRequestHandler<CreateDriverLicenseRequest, GetDriverLicenseResponse>
    {
        private readonly DocMangerContext _context;
        private readonly IMapper _mapper;


        public CreateDriverLicenseHandler(DocMangerContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GetDriverLicenseResponse> Handle(CreateDriverLicenseRequest request, CancellationToken cancellationToken)
        { 
            var epm = _context.Employees.FirstOrDefault(x => x.FirstName == request.FirstName && x.LastName == request.LastName);
            if (epm == null) throw new RestException(HttpStatusCode.BadRequest, "Переданы некорректные даные");
            request.EmployeeId = epm.Id;
            var license = _mapper.Map<CreateDriverLicenseRequest, DriverLicenseEntity>(request);
            await _context.DriverLicenses.AddAsync(license);
            await _context.SaveChangesAsync();
            var query = from b in _context.Employees
                join c in _context.DriverLicenses on b.Id equals c.EmployeeId
                where b.Id == request.EmployeeId
                select new GetDriverLicenseResponse
                {
                    Id  = b.Id,
                    FirstName  = b.FirstName,
                    LastName  = b.LastName,
                    PersonnelNumber = b.PersonnelNumber.ToString(),
                    BthDate = b.BthDate,
                    DivisionNumber = b.DivisionNumber.Name,
                    Category = c.Category,
                    SerialNumber = c.SerialNumber,
                    IssueDate = c.IssueDate,
                    ExpiryDate = c.ExpiryDate,
                };
            return await Task.FromResult(query.AsParallel().AsEnumerable<GetDriverLicenseResponse>().ElementAt(0));
        }
    }
}
