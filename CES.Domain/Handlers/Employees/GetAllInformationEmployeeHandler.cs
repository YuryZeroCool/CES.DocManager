using CES.Domain.Models.Request.Employee;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Employees
{
    public class GetAllInformationEmployeeHandler : IRequestHandler<GetAllInformationEmployeeRequest, object>
    {
        private readonly DocMangerContext _ctx;

        public GetAllInformationEmployeeHandler(DocMangerContext context)
        {
            _ctx = context;
        }

        public async Task<object> Handle(GetAllInformationEmployeeRequest request, CancellationToken cancellationToken)
        {
            object query;
            var emp = await _ctx.Employees.FirstOrDefaultAsync(emp =>
                emp.LastName == request.LastName && emp.FirstName == request.FirstName, cancellationToken);
            if (emp == null) throw new System.Exception("Error");

            var empId = emp.Id;

            if (await _ctx.DriverMedicalCertificate.AnyAsync(p => p.EmployeeId == empId, cancellationToken)
                && await _ctx.DriverLicenses.AnyAsync(p => p.EmployeeId == empId, cancellationToken))
            {
                query = from b in _ctx.Employees
                        join p in _ctx.DriverLicenses on b.Id equals p.EmployeeId
                        join c in _ctx.DriverMedicalCertificate on b.Id equals c.EmployeeId
                        where b.Id == empId
                        select new
                        {
                            b.Id,
                            b.FirstName,
                            b.LastName,
                            b.PersonnelNumber,
                            b.BthDate,
                            DivisionNumber = b.DivisionNumber.Name,
                            p.IssueDate,
                            p.ExpiryDate,
                            p.SerialNumber,
                            p.Category,
                            NumberMedicalCertificate = c.SerialNumber,
                            IssueDateMedicalCertificate = c.IssueDate,
                            ExpiryDateMedicalCertificate = c.ExpiryDate
                        };
                return await Task.FromResult(query);
            }

            if (await _ctx.DriverMedicalCertificate.AnyAsync(p => p.EmployeeId == empId, cancellationToken))
            {
                query = from b in _ctx.Employees
                        join c in _ctx.DriverMedicalCertificate on b.Id equals c.EmployeeId
                        where b.Id == empId
                        select new
                        {
                            b.Id,
                            b.FirstName,
                            b.LastName,
                            b.PersonnelNumber,
                            b.BthDate,
                            DivisionNumber = b.DivisionNumber.Name,
                            NumberMedicalCertificate = c.SerialNumber,
                            IssueDateMedicalCertificate = c.IssueDate,
                            ExpiryDateMedicalCertificate = c.ExpiryDate
                        };
                return await Task.FromResult(query);
            }
            if (await _ctx.DriverLicenses.AnyAsync(p => p.EmployeeId == empId, cancellationToken))
            {
                query = from b in _ctx.Employees
                        join p in _ctx.DriverLicenses on b.Id equals p.EmployeeId
                        where b.Id == empId
                        select new
                        {
                            b.Id,
                            b.FirstName,
                            b.LastName,
                            b.PersonnelNumber,
                            b.BthDate,
                            DivisionNumber = b.DivisionNumber.Name,
                            p.IssueDate,
                            p.ExpiryDate,
                            p.SerialNumber,
                            p.Category,
                        };
                return await Task.FromResult(query);
            }

            return await Task.FromResult(emp);
        }
    }
}
