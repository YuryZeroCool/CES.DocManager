using AutoMapper;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class GetExpiringDocumentEmployeeHandler :
        IRequestHandler<GetExpiringDocumentEmployeeRequest, IEnumerable<GetExpiringDocumentEmployeeResponse>>
    {
        private readonly IMapper _mapper;
        private readonly DocMangerContext _context;

        public GetExpiringDocumentEmployeeHandler(IMapper mapper, DocMangerContext docMangerContext)
        {
            _context = docMangerContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetExpiringDocumentEmployeeResponse>> Handle(
            GetExpiringDocumentEmployeeRequest request, CancellationToken cancellationToken)
        {
            List<GetExpiringDocumentEmployeeResponse> dates = new();
            if (request.NameDocument == "DriverLicense")
            {
                var date = _context.DriverLicenses.Join(_context.Employees,
                    p => p.EmployeeId,
                    c => c.Id,
                    (p, c) => new
                    {
                        c.Id,
                        c.FirstName,
                        c.LastName,
                        c.BthDate,
                        DivisionNumber = c.DivisionNumber.Name,
                        p.ExpiryDate,
                    }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(request.NumberMonth));
                foreach (var item in date)
                {
                    dates.Add((GetExpiringDocumentEmployeeResponse) new GetExpiringDocumentEmployeeResponse()
                    {
                        Id = item.Id + DateTime.Now.Millisecond,
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        DivisionNumber = item.DivisionNumber,
                        BthDate = item.BthDate,
                        ExpiryDate = item.ExpiryDate,
                    });
                }

                ;

            }
            else if (request.NameDocument == "DriverMedicalCertificate")
            {
                var date = _context.DriverMedicalCertificate.Join(_context.Employees,
                    p => p.EmployeeId,
                    c => c.Id,
                    (p, c) => new
                    {
                        c.Id,
                        c.FirstName,
                        c.LastName,
                        c.BthDate,
                        DivisionNumber = c.DivisionNumber.Name,
                        p.ExpiryDate,
                    }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(request.NumberMonth));
                foreach (var item in date)
                {
                    dates.Add(new GetExpiringDocumentEmployeeResponse()
                    {
                        Id = item.Id,
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        DivisionNumber = item.DivisionNumber,
                        BthDate = item.BthDate,
                        ExpiryDate = item.ExpiryDate,
                    });
                }
            }

            return await Task.FromResult(dates);
        }
    }
}
