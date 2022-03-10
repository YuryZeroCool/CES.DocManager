using AutoMapper;
using CES.DocManger.WebApi.Models;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO.Pipelines;
using System.Net;
using System.Threading.Tasks;

namespace CES.DocManger.WebApi.Controllers
{
    //[EnableCors("MyPolicy")]

    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public EmployeeController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet]
        [Produces(typeof(IEnumerable<GetEmployeeFullNameResponse>))]
        public async Task<Object> GetAllEmployees()
        {
            try
            {
                var response = await _mediator.Send(new GetEmployeeFullNameRequest());
                return _mapper.Map<IEnumerable<GetEmployeeFullNameResponse>>(response);
            }
            catch (Microsoft.Data.SqlClient.SqlException)
            {
                HttpContext.Response.StatusCode=(int)HttpStatusCode.NotExtended;
               
                return null;
            }
            catch (Exception e)
            {
      
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                
                 return  new 
                 {
                     statusCode =  404,
                     title = e.Message
                 };
            }
        }

        [HttpGet("isPersonalNumber/{personalNumber}")]
        public async Task<bool> GetIsPersonalNumber(int personalNumber)
        {
           return await _mediator.Send(new GetIsValidNumberNumberRequest { Id = personalNumber });
        }

        [HttpGet("firstName/{divisionNumber}")]
        public async Task<IEnumerable<GetEmployeeFullNameResponse>> GetShiftEmployees(string divisionNumber)
        {
            try
            {
                var response = await _mediator.Send(new GetEmployeeFullNameRequest() { divisionNumber = divisionNumber });
                return _mapper.Map<IEnumerable<GetEmployeeFullNameResponse>>(response);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //[HttpGet("{id}")]
        //public async Task<EmployeeView> GetEmployee(int id)
        //{
        //    var date = await _context.Employees.Join(_context.Divisions,
        //       p => p.DivisionNumberId,
        //       c => c.Id,
        //       (p, c) => new
        //       {
        //           p.Id,
        //           p.FirstName,
        //           p.LastName,
        //           p.PersonnelNumber,
        //           DivisionNumber = c.Name,
        //           p.BthDate,
        //       }).FirstOrDefaultAsync(p => p.Id == id);

        //    return new EmployeeView
        //    {
        //        Id = date.Id,
        //        LastName = date.LastName,
        //        FirstName = date.FirstName,
        //        PersonnelNumber = date.PersonnelNumber,
        //        DivisionNumber = date.DivisionNumber,
        //        BirthDate = date.BthDate
        //    };
        //}

        [HttpGet("noDriverLicense")]
        public async Task<IEnumerable<GetEmployeeFullNameResponse>> GetListEmployeesNoDriverLicense()
        {
            try
            {
                return await _mediator.Send(new ListEmployeesNoDriverLicenseRequest());
            }
            catch (Exception)
            {
                throw;
            }
          
        }

        [HttpGet("expiringDriverLicense/{numberMonths}")]
        public async Task<IEnumerable<ExpiringDocumentEmployeeResponse>>  GetExpiringDriverLicense(int numberMonth)
        {
            return await _mediator.Send(new GetExpiringDocumentEmployeeRequest() {numberMonth = numberMonth});

        }

        [HttpGet("expiringDriverMedicalCertificate/{numberMonths}")]
        public async  Task<IEnumerable<ExpiringDocumentEmployeeResponse>> GetExpiringDriverMedicalCertificate(int numberMonth)
        {
            return await _mediator.Send(new GetExpiringDocumentEmployeeRequest() 
            { 
                numberMonth = numberMonth,
                nameDocument = "DriverMedicalCertificate"
            });
        }

        [HttpGet("medicalCertificate/noDriverMedicalCertificate")]
        public async Task <IEnumerable<GetEmployeeFullNameResponse>> GetNoMedicalCertificate()
        {
            return await _mediator.Send(new GetNoMedicalCertificateRequest());
        }

        [HttpGet("AllInformationEmployee")]
        public async Task<object> GetAllInformationEmployee([FromQuery()]GetEmployeeViewModel model )
        {
            return await _mediator.Send(_mapper.Map<GetAllInformationEmployeeRequest>(model));
        }

        [HttpPost]
        public async Task CreateEmployee([FromBody]CreateEmployeeViewModel model)
        {
            await _mediator.Send(_mapper.Map<CreateEmployeeRequest>(model));
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(int id, [FromBody] EmployeeView model)
        //{
        //    var employee = await _context.Employees.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        //    if (employee == null)
        //    {
        //        return NotFound();
        //    }

        //    var newEmployee = _mapper.Map<EmployeeEntity>(model);
        //    newEmployee.Id = id;
        //    _context.Employees.Update(newEmployee);
        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteEmployee(int id)
        //{


        //    var employee = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
        //    if (employee == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Employees.Remove(employee);
        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}
    }
}
