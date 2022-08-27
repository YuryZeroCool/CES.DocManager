using AutoMapper;
using CES.Domain.Models.Request.Employee;
using CES.Infra;
using CES.Infra.Models;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class CreateEmployeeHandler : IRequestHandler<CreateEmployeeRequest>
    {
        public readonly DocMangerContext _docMangerContext;

        public readonly IMapper _mapper;

        public CreateEmployeeHandler(DocMangerContext mangerContex, IMapper mapper)
        {
            _docMangerContext = mangerContex;
            _mapper = mapper;

        }
        public async Task<Unit> Handle(CreateEmployeeRequest request, CancellationToken cancellationToken)
        {
            var DivisionNumberId = _docMangerContext.Divisions.FirstOrDefault(x => x.Name == request.DivisionNumber);

            var employee = _mapper.Map<EmployeeEntity>(request);
            employee.DivisionNumber = DivisionNumberId;
            await _docMangerContext.AddAsync(employee);
            await _docMangerContext.SaveChangesAsync();
            return await Task.FromResult(new Unit());
        }
    }
}
