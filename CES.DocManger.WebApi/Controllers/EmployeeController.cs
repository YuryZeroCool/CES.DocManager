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
        public IEnumerable<EmployeeView> getAllEmployees()
        {
            var data = _context.Employees.Include(p=>p.DivisionNumber).ToList();
            return _mapper.Map<List<EmployeeView>>(data);
        }

        [HttpGet("firstName/{divisionNumber}")]
        public IEnumerable<EmployeeFirstLastName> getFirstLastName( string divisionNumber)
        {
            var data = _context.Divisions.FirstOrDefault(x => x.Name == divisionNumber);
            var emp = _context.Employees.Where(x => x.DivisionNumber == data).ToList();
            return emp.Select(x => new EmployeeFirstLastName
            {
                FirstName = x.FirstName,

                LastName = x.LastName
            }).ToList();

        }

        [HttpGet("{id}")]
        public async Task<EmployeeView> getEmployee(int id)
        {
            var date = await   _context.Divisions.Join(_context.Employees,
                p => p.Id,
                c => c.Id,
                (p, c) => new
                {
                    Id = c.Id,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    PersonnelNumber = c.PersonnelNumber,
                    BthDate = c.BthDate,
                    DivisionNumber = c.DivisionNumber.Name,
                }).Where(p => p.Id == id).FirstOrDefaultAsync(x => x.Id == id);
            return new EmployeeView { 
            LastName = date.LastName,
            FirstName = date.FirstName,
            PersonnelNumber = date.PersonnelNumber,
            DivisionNumber = date.DivisionNumber,
            BthDate = date.BthDate
            };
        }

        [HttpGet("expiringDriverLicense/{numberMonths}")]
        public ICollection<DriverEndLicense> getExpiringDriverLicense(int numberMonths)
        {
            List<DriverEndLicense> dates = new List<DriverEndLicense>();
            var date = _context.DriverLicenses.Join(_context.Employees,
                p => p.EmployeeId,
                c => c.Id,
                (p, c) => new
                {
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    BthDate = c.BthDate,
                    DivisionNumber = c.DivisionNumber.Name,
                    ExpiryDate = p.ExpiryDate,
                }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(numberMonths));
            foreach (var item in date)
            {
                dates.Add(new DriverEndLicense()
                {
                    FirstName = item.FirstName.ToString(),
                    LastName = item.LastName.ToString(),
                    DivisionNumber = item.DivisionNumber,
                    BthDate = item.BthDate,
                    ExpiryDate = item.ExpiryDate,
                }) ;
            };
            return  dates;
        }

        [HttpPost]
        public async Task<int> createEmployee([FromBody] EmployeeView model)
        {
            var employee =  _mapper.Map<EmployeeEntity>(model);
            employee.DivisionNumber = _context.Divisions.FirstOrDefault(x => x.Name == model.DivisionNumber);
          
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
        public async Task<IActionResult> deleteEmployee(int id)
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
