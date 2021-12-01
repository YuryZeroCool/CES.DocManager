using CES.Domain.Models.Request.Employee;
using CES.Infra;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CES.Domain.Handlers.Employees
{
    public class GetIsPersonalNumberHandler : IRequestHandler<GetIsValidNumberNumberRequest, bool>
    {
        private readonly DocMangerContext _mangerContex;

        public GetIsPersonalNumberHandler(DocMangerContext docManger)
        {
            _mangerContex = docManger;
        }
       
        public async Task <bool> Handle(GetIsValidNumberNumberRequest request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(!_mangerContex.Employees.Any(emp => emp.PersonnelNumber == request.Id));
        }

    }
}
