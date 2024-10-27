using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class GetExpiringDocumentEmployeeHandler :
        IRequestHandler<GetExpiringDocumentEmployeeRequest, IEnumerable<GetExpiringDocumentEmployeeResponse>>
    {
        private readonly DocMangerContext _ctx;

        public GetExpiringDocumentEmployeeHandler(DocMangerContext docMangerContext)
        {
            _ctx = docMangerContext;
        }

        public async Task<IEnumerable<GetExpiringDocumentEmployeeResponse>> Handle(
            GetExpiringDocumentEmployeeRequest request, CancellationToken cancellationToken)
        {
            List<GetExpiringDocumentEmployeeResponse> dates = new();
            switch (request.NameDocument)
            {
                case "DriverLicense":
                    {
                        var date = _ctx.DriverLicenses.Join(_ctx.Employees,
                            p => p.EmployeeId,
                            c => c.Id,
                            (p, c) => new
                            {
                                c.Id,
                                c.FirstName,
                                c.LastName,
                                c.BthDate,
                                DivisionNumber = c.DivisionNumber.Name,
                                p.ExpiryDate,
                            }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(request.NumberMonth));
                        foreach (var item in date)
                        {
                            dates.Add(new GetExpiringDocumentEmployeeResponse()
                            {
                                Id = item.Id + DateTime.Now.Millisecond,
                                FirstName = item.FirstName,
                                LastName = item.LastName,
                                DivisionNumber = item.DivisionNumber,
                                BthDate = item.BthDate,
                                ExpiryDate = item.ExpiryDate,
                            });
                        }

                        break;
                    }
                case "DriverMedicalCertificate":
                    {
                        var date = _ctx.DriverMedicalCertificate.Join(_ctx.Employees,
                            p => p.EmployeeId,
                            c => c.Id,
                            (p, c) => new
                            {
                                c.Id,
                                c.FirstName,
                                c.LastName,
                                c.BthDate,
                                DivisionNumber = c.DivisionNumber.Name,
                                p.ExpiryDate,
                            }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(request.NumberMonth));
                        foreach (var item in date)
                        {
                            dates.Add(new GetExpiringDocumentEmployeeResponse()
                            {
                                Id = item.Id,
                                FirstName = item.FirstName,
                                LastName = item.LastName,
                                DivisionNumber = item.DivisionNumber,
                                BthDate = item.BthDate,
                                ExpiryDate = item.ExpiryDate,
                            });
                        }

                        break;
                    }
            }

            return await Task.FromResult(dates);
        }
    }
}
