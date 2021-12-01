using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Employees
{
    public class GetExpiringDocumentEmployeeHandler :
        IRequestHandler<GetExpiringDocumentEmployeeRequest, IEnumerable<ExpiringDocumentEmployeeResponse>>
    {
        private readonly IMapper _mapper;
        private readonly DocMangerContext _context;
        public GetExpiringDocumentEmployeeHandler(IMapper mapper, DocMangerContext docMangerContext)
        {
            _context = docMangerContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ExpiringDocumentEmployeeResponse>> Handle(GetExpiringDocumentEmployeeRequest request, CancellationToken cancellationToken)
        {
            List<ExpiringDocumentEmployeeResponse> dates = new();
            if (request.nameDocument == "DriverLicense")
            {
                
                var date = _context.DriverLicenses.Join(_context.Employees,
                    p => p.EmployeeId,
                    c => c.Id,
                    (p, c) => new
                    {
                        c.FirstName,
                        c.LastName,
                        c.BthDate,
                        DivisionNumber = c.DivisionNumber.Name,
                        p.ExpiryDate,
                    }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(request.numberMonth));
                foreach (var item in date)
                {
                    dates.Add((ExpiringDocumentEmployeeResponse) new ExpiringDocumentEmployeeResponse()
                    {
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        DivisionNumber = item.DivisionNumber,
                        BthDate = item.BthDate,
                        IssueDate = item.ExpiryDate,
                    });
                };
               
            }
            else if(request.nameDocument == "DriverMedicalCertificate")
            {
                var date = _context.DriverMedicalCertificate.Join(_context.Employees,
                    p => p.EmployeeId,
                    c => c.Id,
                    (p, c) => new
                    {
                        c.FirstName,
                        c.LastName,
                        c.BthDate,
                        DivisionNumber = c.DivisionNumber.Name,
                        p.ExpiryDate,
                    }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(request.numberMonth));
                foreach (var item in date)
                {
                    dates.Add(new ExpiringDocumentEmployeeResponse()
                    {
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        DivisionNumber = item.DivisionNumber,
                        BthDate = item.BthDate,
                        IssueDate = item.ExpiryDate,
                    });
                }
            }
            return await Task.FromResult(dates);
        }
    }
}
