using MediatR;

namespace CES.Domain.Models.Request.Employee
{
    public class GetEmployeeByCarNumberRequest : IRequest<List<string>>
    {
        public string CarNumber { get; set; } = string.Empty;
    }
}
