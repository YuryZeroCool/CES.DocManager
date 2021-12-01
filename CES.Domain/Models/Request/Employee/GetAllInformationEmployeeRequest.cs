using MediatR;

namespace CES.Domain.Models.Request.Employee
{
    public class GetAllInformationEmployeeRequest : BaseModelEmployee, IRequest<object>
    {
    }
}
