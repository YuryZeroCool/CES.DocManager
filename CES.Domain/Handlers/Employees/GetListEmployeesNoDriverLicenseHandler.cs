using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class GetListEmployeesNoDriverLicenseHandler : 
        IRequestHandler<GetListEmployeesNoDriverLicenseRequest, IEnumerable<GetEmployeesByDivisionResponse>>
    {
        private readonly DocMangerContext _ctx;
        public GetListEmployeesNoDriverLicenseHandler(DocMangerContext docMangerContext)
        {
            _ctx = docMangerContext;
        }
        public async Task<IEnumerable<GetEmployeesByDivisionResponse>> Handle(GetListEmployeesNoDriverLicenseRequest request, CancellationToken cancellationToken)
        {
            List<GetEmployeesByDivisionResponse> list = new();

            var query = from b in _ctx.Employees
                join p in _ctx.DriverLicenses
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

                list.Add((new GetEmployeesByDivisionResponse()
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                }));
            }
            return await Task.FromResult(list);
        }
    }
}
