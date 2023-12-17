using CES.Domain.Exception;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using MediatR;
using System.Net;

namespace CES.Domain.Handlers.Employees
{
    public class GetEmployeesByDivisionHandler : IRequestHandler<GetEmployeesByDivisionRequest,
        IEnumerable<GetEmployeesByDivisionResponse>>
    {
        private readonly DocMangerContext _mangerContext;

        public GetEmployeesByDivisionHandler(DocMangerContext mangerContext)
        {
            _mangerContext = mangerContext;
        }

        public async Task<IEnumerable<GetEmployeesByDivisionResponse>> Handle(GetEmployeesByDivisionRequest request, CancellationToken cancellationToken)
        {

            if (request.DivisionNumber == null) throw new RestException(HttpStatusCode.BadRequest, "Неверный запрос");
            var division = _mangerContext!.Divisions!.FirstOrDefault(x => x.Name == request.DivisionNumber) ?? throw new RestException(HttpStatusCode.NotFound, "Не существует такого подразделения");
            var emp = _mangerContext.Employees!.Where(x => x.DivisionNumber == division).ToList();

            if (emp.Count == 0) throw new RestException(HttpStatusCode.NotFound, "Нет сотрудников");
            return await Task.FromResult(emp.Select(x => new GetEmployeesByDivisionResponse
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
            }));
        }
    }
}
