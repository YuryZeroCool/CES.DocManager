using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class GetNoMedicalCertificateHandler : IRequestHandler<GetNoMedicalCertificateRequest, IEnumerable<GetEmployeeFullNameResponse>>
    {
        private readonly DocMangerContext _context;
        public GetNoMedicalCertificateHandler(DocMangerContext dbContext)
        {
            _context = dbContext;
        }
        public async Task<IEnumerable<GetEmployeeFullNameResponse>> Handle(GetNoMedicalCertificateRequest request, CancellationToken cancellationToken)
        {
            List<GetEmployeeFullNameResponse> data = new();

            var query = from b in _context.Employees
                join p in _context.DriverMedicalCertificate
                    on b.Id equals p.EmployeeId into grouping
                from p in grouping.DefaultIfEmpty()
                select new
                {
                    b.FirstName,
                    b.LastName,
                    p.SerialNumber
                };

            foreach (var item in query.Where(c => c.SerialNumber == null))
            {

                data.Add(new GetEmployeeFullNameResponse()
                {
                    FirstName = item.FirstName,
                    LastName = item.LastName
                });

            }
            return await Task.FromResult(data);

        }
    }
}
