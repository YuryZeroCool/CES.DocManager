using AutoMapper;
using CES.Domain.Exception;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CES.Domain.Handlers.Employees
{
    public class GetEmployeesByDivisionHandler : IRequestHandler<GetEmployeesByDivisionRequest,
        IEnumerable<GetEmployeesByDivisionResponse>>
    {
        private readonly IMapper _mapper;
        private readonly DocMangerContext _mangerContext;

        public GetEmployeesByDivisionHandler(IMapper mapper, DocMangerContext mangerContext)
        {
            _mapper = mapper;
            _mangerContext = mangerContext;
        }

        public async Task<IEnumerable<GetEmployeesByDivisionResponse>> Handle(GetEmployeesByDivisionRequest request, CancellationToken cancellationToken)
        {

            if (request.divisionNumber != null)
            {
                var division = _mangerContext.Divisions.FirstOrDefault(x => x.Name == request.divisionNumber);

                if (division == null) throw new RestException(HttpStatusCode.NotFound, "Не существует такого подразделения" );

                var emp = _mangerContext.Employees.Where(x => x.DivisionNumber == division).ToList();

                if (emp.Count == 0) throw new RestException(HttpStatusCode.NotFound, "Нет сотрудников");
                return await Task.FromResult(emp.Select(x => new GetEmployeesByDivisionResponse
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                }));
            }
            throw new RestException(HttpStatusCode.BadRequest, "Неверный запрос");

            //var data = await _mangerContext.Employees.ToListAsync(cancellationToken: cancellationToken);
            //return _mapper.Map<IEnumerable<GetEmployeesByDivisionResponse>>(data);

        }
    }
}
