using CES.Domain.Models.Request.Employee;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class GetIsPersonalNumberHandler : IRequestHandler<GetIsValidNumberNumberRequest, bool>
    {
        private readonly DocMangerContext _mangerContext;

        public GetIsPersonalNumberHandler(DocMangerContext docManger)
        {
            _mangerContext = docManger;
        }

        public async Task<bool> Handle(GetIsValidNumberNumberRequest request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(!_mangerContext.Employees.Any(emp => emp.PersonnelNumber == request.Id));
        }
    }
}
