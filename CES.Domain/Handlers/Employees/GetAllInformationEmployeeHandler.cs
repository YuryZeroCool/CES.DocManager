using CES.Domain.Models.Request.Employee;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class GetAllInformationEmployeeHandler : IRequestHandler<GetAllInformationEmployeeRequest, object>
    {
        private readonly DocMangerContext _context;

        public GetAllInformationEmployeeHandler(DocMangerContext context)
        {
            _context = context;
        }

        public async Task<object> Handle(GetAllInformationEmployeeRequest request, CancellationToken cancellationToken)
        {
            object query = null;
            var emp = _context.Employees.FirstOrDefault(emp =>
                emp.LastName == request.LastName && emp.FirstName == request.FirstName);
            var empId = emp.Id;

            if (_context.DriverMedicalCertificate.Any(p => p.EmployeeId == empId)
                && _context.DriverLicenses.Any(p => p.EmployeeId == empId))
            {
                query = from b in _context.Employees
                        join p in _context.DriverLicenses on b.Id equals p.EmployeeId
                        join c in _context.DriverMedicalCertificate on b.Id equals c.EmployeeId
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

            if (_context.DriverMedicalCertificate.Any(p => p.EmployeeId == empId))
            {
                query = from b in _context.Employees
                        join c in _context.DriverMedicalCertificate on b.Id equals c.EmployeeId
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
            }
            if (_context.DriverLicenses.Any(p => p.EmployeeId == empId))
            {
                query = from b in _context.Employees
                        join p in _context.DriverLicenses on b.Id equals p.EmployeeId
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
