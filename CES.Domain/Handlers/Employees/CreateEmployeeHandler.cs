using AutoMapper;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using CES.Infra.Models;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class CreateEmployeeHandler : IRequestHandler<CreateEmployeeRequest, CreateEmployeeResponse>
    {
        public readonly DocMangerContext _docMangerContext;

        public readonly IMapper _mapper;

        public CreateEmployeeHandler(DocMangerContext mangerContex, IMapper mapper)
        {
            _docMangerContext = mangerContex;
            _mapper = mapper;

        }
        public async Task<CreateEmployeeResponse> Handle(CreateEmployeeRequest request, CancellationToken cancellationToken)
        {
            var DivisionNumberId = _docMangerContext.Divisions.FirstOrDefault(x => x.Name == request.DivisionNumber);
            if (DivisionNumberId == null) throw new SystemException("Error");

            var employee = _mapper.Map<EmployeeEntity>(request);
            employee.DivisionNumber = DivisionNumberId;
            await  _docMangerContext.AddAsync(employee,cancellationToken);
            await _docMangerContext.SaveChangesAsync(cancellationToken);

            var res = _mapper.Map<CreateEmployeeResponse>(employee);
            if (res == null) throw new System.Exception("Error");

            res.DivisionNumber = employee.DivisionNumber.Name;
            return await Task.FromResult(res);
        }
    }
}
