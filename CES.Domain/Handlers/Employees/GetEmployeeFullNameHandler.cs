using AutoMapper;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CES.Domain.Handlers.Employees
{
    public class GetEmployeeFullNameHandler : IRequestHandler<GetEmployeeFullNameRequest, 
        IEnumerable<GetEmployeeFullNameResponse>>
    {
        private readonly IMapper _mapper;
        private readonly DocMangerContext _mangerContex;

        public GetEmployeeFullNameHandler(IMapper mapper, DocMangerContext mangerContext)
        {
            _mapper = mapper;
            _mangerContex = mangerContext;
        }

        public async Task<IEnumerable<GetEmployeeFullNameResponse>> Handle(GetEmployeeFullNameRequest request, CancellationToken cancellationToken)
        {
            if(request.divisionNumber != null)
            {
                var division =  _mangerContex.Divisions.FirstOrDefault(x => x.Name == request.divisionNumber);
                var emp = _mangerContex.Employees.Where(x => x.DivisionNumber == division).ToList();
                return await Task.FromResult(emp.Select(x => new GetEmployeeFullNameResponse
                {
                    FirstName = x.FirstName,
                   LastName = x.LastName,
                }));
            }
            List<EmployeeEntity> data = await _mangerContex.Employees.ToListAsync();
            return  _mapper.Map<IEnumerable<GetEmployeeFullNameResponse>>(data);
        }
    }
}
