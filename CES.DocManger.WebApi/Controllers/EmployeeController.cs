using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CES.DocManger.WebApi.Models.Request;
using CES.DocManger.WebApi.Models.Response;
using CES.Infra;
using CES.Infra.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using Microsoft.AspNetCore.Cors;
using CES.DocManger.WebApi.Models.Response.Employees;
using CES.DocManger.WebApi.Models.Response.DriverMedicalCertificate;

namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]

    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DocMangerContex _context;

        private readonly IMapper _mapper;

        public EmployeeController(DocMangerContex context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<EmployeeView> GetAllEmployees()
        {
            var data = _context.Employees.Include(p => p.DivisionNumber).ToList();
            return _mapper.Map<List<EmployeeView>>(data);
        }

        [HttpGet("isPersonalNumber/{personalNumber}")]
        public async Task<bool> GetIsPersonalNumber(int personalNumber)
        {
           var number = await _context.Employees.FirstOrDefaultAsync(x => x.PersonnelNumber == personalNumber);
            if (number != null) return true;
            return false;

        }

        [HttpGet("firstName/{divisionNumber}")]
        public IEnumerable<EmployeeFirstLastName> GetFirstLastName( string divisionNumber)
        {
            var data = _context.Divisions.FirstOrDefault(x => x.Name == divisionNumber);
            var emp = _context.Employees.Where(x => x.DivisionNumber == data).ToList();
            return emp.Select(x => new EmployeeFirstLastName
            {
                Id= x.Id,
               
                FirstName = x.FirstName,

                LastName = x.LastName,

            }).ToList();

        }

        [HttpGet("{id}")]
        public async Task<EmployeeView> GetEmployee(int id)
        {
            var date = await _context.Employees.Join(_context.Divisions,
               p => p.DivisionNumberId,
               c => c.Id,
               (p, c) => new
               {
                   p.Id,
                   p.FirstName,
                   p.LastName,
                   p.PersonnelNumber,
                   DivisionNumber = c.Name,
                   p.BthDate,
               }).FirstOrDefaultAsync(p => p.Id == id);

            return new EmployeeView
            {
                Id = date.Id,
                LastName = date.LastName,
                FirstName = date.FirstName,
                PersonnelNumber = date.PersonnelNumber,
                DivisionNumber = date.DivisionNumber,
                BirthDate = date.BthDate
            };
        }

        [HttpGet("expiringDriverLicense/noDriverLicense")]
        public ICollection<NoEmployeDriverlicense> GetNoDriverLicense()
        {
            List<NoEmployeDriverlicense> list = new();
                       
            var query = from b in _context.Employees
                        join p in _context.DriverLicenses
                            on b.Id equals p.EmployeeId into grouping
                        from p in grouping.DefaultIfEmpty()
                        select new {
                            FirstName = b.FirstName,
                        LastName = b.LastName,
                        SerialNumber= p.SerialNumber
                        };
            
            foreach (var item in query.Where(c=>c.SerialNumber==null))
            {

                list.Add(new NoEmployeDriverlicense()
                {
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    SerialNumber = item.SerialNumber
                });
   
            }
            return list;
        }

        [HttpGet("expiringDriverLicense/{numberMonths}")]
        public ICollection<DriverEndLicense> GetExpiringDriverLicense(int numberMonths)
        {
            List<DriverEndLicense> dates = new ();
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
                }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(numberMonths));
            foreach (var item in date)
            {
                dates.Add(new DriverEndLicense()
                {
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    DivisionNumber = item.DivisionNumber,
                    BirthDate = item.BthDate,
                    ExpiryDate = item.ExpiryDate,
                }) ;
            };
            return  dates;
        }

        [HttpGet("expiringDriverMedicalCertificate/{numberMonths}")]
        public ICollection<ExpiringDriverMedicalCertificateView> GetExpiringDriverMedicalCertificate(int numberMonths)
        {
            List<ExpiringDriverMedicalCertificateView> dates = new();
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
                }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(numberMonths));
            foreach (var item in date)
            {
                dates.Add(new ExpiringDriverMedicalCertificateView()
                {
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    DivisionNumber = item.DivisionNumber,
                    BirthDate = item.BthDate,
                    ExpiryDate = item.ExpiryDate,
                });
            };
            return dates;
        }


        [HttpPost]
        public async Task<int> CreateEmployee([FromBody] EmployeeView model)
        {
            var employee =  _mapper.Map<EmployeeEntity>(model);
            employee.DivisionNumberId = _context.Divisions
                .FirstOrDefault(x => x.Name == model.DivisionNumber).Id;
          
           await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee.Id;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EmployeeView model)
        {
            var employee = await _context.Employees.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            var newEmployee = _mapper.Map<EmployeeEntity>(model);
            newEmployee.Id = id;
            _context.Employees.Update(newEmployee);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
