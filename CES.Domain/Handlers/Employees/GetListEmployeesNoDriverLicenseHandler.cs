using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using System.Threading;
using AutoMapper;
using CES.Infra;

namespace CES.Domain.Handlers.Employees
{
    public class GetListEmployeesNoDriverLicenseHandler :
        IRequestHandler<ListEmployeesNoDriverLicenseRequest, IEnumerable<GetEmployeeFullNameResponse>>
    {
        private readonly IMapper _mapper;
        private readonly DocMangerContext _context;
        public GetListEmployeesNoDriverLicenseHandler(IMapper mapper, DocMangerContext docMangerContext)
        {
            _mapper = mapper;
            _context = docMangerContext;
        }
        public async Task<IEnumerable<GetEmployeeFullNameResponse>> Handle(ListEmployeesNoDriverLicenseRequest request, CancellationToken cancellationToken)
        {
            List<GetEmployeeFullNameResponse> list = new();

            var query = from b in _context.Employees
                join p in _context.DriverLicenses
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

                list.Add((new GetEmployeeFullNameResponse()
                {
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                }));
            }
            return await Task.FromResult(list);
        }
    }
}
