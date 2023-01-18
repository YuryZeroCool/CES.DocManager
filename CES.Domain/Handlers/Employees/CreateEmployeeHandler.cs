using AutoMapper;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Employees
{
    public class CreateEmployeeHandler : IRequestHandler<CreateEmployeeRequest, CreateEmployeeResponse>
    {
        private readonly DocMangerContext _docManagerCtx;

        private readonly IMapper _mapper;

        public CreateEmployeeHandler(DocMangerContext managerContext, IMapper mapper)
        {
            _docManagerCtx = managerContext;
            _mapper = mapper;

        }
        public async Task<CreateEmployeeResponse> Handle(CreateEmployeeRequest request, CancellationToken cancellationToken)
        {
            var divisionNumberId = await _docManagerCtx.Divisions.FirstOrDefaultAsync(x =>
                x.Name == request.DivisionNumber, cancellationToken);
            if (divisionNumberId == null) throw new SystemException("Error");

            var employee = _mapper.Map<EmployeeEntity>(request);
            employee.DivisionNumber = divisionNumberId;
            await _docManagerCtx.AddAsync(employee,cancellationToken);
            await _docManagerCtx.SaveChangesAsync(cancellationToken);

            var res = _mapper.Map<CreateEmployeeResponse>(employee);
            if (res == null) throw new System.Exception("Error");

            res.DivisionNumber = employee.DivisionNumber.Name;
            return await Task.FromResult(res);
        }
    }
}
