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
        private readonly DocMangerContext _ctx;
        private readonly IMapper _mapper;


        public CreateDriverLicenseHandler(DocMangerContext context, IMapper mapper)
        {
            _ctx = context;
            _mapper = mapper;
        }

        public async Task<GetDriverLicenseResponse> Handle(CreateDriverLicenseRequest request, CancellationToken cancellationToken)
        {
            var epm = _ctx.Employees.FirstOrDefault(x => x.FirstName == request.FirstName && x.LastName == request.LastName);
            if (epm == null) throw new RestException(HttpStatusCode.BadRequest, "Переданы некорректные данные");
            request.EmployeeId = epm.Id;
            var license = _mapper.Map<CreateDriverLicenseRequest, DriverLicenseEntity>(request);
            await _ctx.DriverLicenses.AddAsync(license, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);

            var query = from b in _ctx.Employees
                        join c in _ctx.DriverLicenses on b.Id equals c.EmployeeId
                        where b.Id == request.EmployeeId
                        select new GetDriverLicenseResponse
                        {
                            Id = b.Id,
                            FirstName = b.FirstName,
                            LastName = b.LastName,
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
