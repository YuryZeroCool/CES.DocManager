using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class GetNoMedicalCertificateHandler : IRequestHandler<GetNoMedicalCertificateRequest, IEnumerable<GetEmployeesByDivisionResponse>>
    {
        private readonly DocMangerContext _ctx;
        public GetNoMedicalCertificateHandler(DocMangerContext dbContext)
        {
            _ctx = dbContext;
        }
        public async Task<IEnumerable<GetEmployeesByDivisionResponse>> Handle(GetNoMedicalCertificateRequest request, CancellationToken cancellationToken)
        {
            List<GetEmployeesByDivisionResponse> data = new();
            var query = from b in _ctx.Employees
                        join p in _ctx.DriverMedicalCertificate
                            on b.Id equals p.EmployeeId into grouping
                        from p in grouping.DefaultIfEmpty()
                        select new
                        {
                            b.Id,
                            b.FirstName,
                            b.LastName,
                            p.SerialNumber
                        };
            foreach (var item in query.Where(c => c.SerialNumber == null))
            {
                data.Add(new GetEmployeesByDivisionResponse()
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName
                });
            }
            return await Task.FromResult(data);
        }
    }
}
