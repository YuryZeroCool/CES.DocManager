using AutoMapper;
using CES.Domain.Models.Request.Employee;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CES.Domain.Handlers.Employees
{
    public class AddEmployeeHandler : IRequestHandler<CreateEmployeeRequest>
    {
        public readonly DocMangerContext _docMangerContex;

        public readonly IMapper _mapper;

        public AddEmployeeHandler (DocMangerContext mangerContex, IMapper mapper)
        {
            _docMangerContex = mangerContex;
            _mapper = mapper;

        }
        public async Task<Unit> Handle(CreateEmployeeRequest request, CancellationToken cancellationToken)
        {
            var DivisionNumberId = _docMangerContex.Divisions.FirstOrDefault(x => x.Name == request.DivisionNumber);

            var employee = _mapper.Map<EmployeeEntity>(request);
            employee.DivisionNumber = DivisionNumberId;
            await _docMangerContex.AddAsync(employee); 
            await _docMangerContex.SaveChangesAsync();
            return await Task.FromResult(new Unit());
        }
    }
}
