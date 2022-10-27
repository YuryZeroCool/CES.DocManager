using CES.Domain.Models.Request.Employee;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class GetIsPersonalNumberHandler : IRequestHandler<GetIsValidNumberNumberRequest, bool>
    {
        private readonly DocMangerContext _ctx;

        public GetIsPersonalNumberHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<bool> Handle(GetIsValidNumberNumberRequest request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(_ctx.Employees.Any(emp => emp.PersonnelNumber == request.Id));
        }
    }
}
