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
        public IEnumerable<EmployeeViewModel> Get()
        {
            var data = _context.Employees.Include(p=>p.DivisionNumber).ToList();
            return _mapper.Map<List<EmployeeViewModel>>(data);
        }

        [HttpGet("division/{divisionNumber}")]
        public IEnumerable<EmployeeView> GetNameEmployee( string divisionNumber)
        {
            var data = _context.Divisions.FirstOrDefault(x => x.Name == divisionNumber);
            var emp = _context.Employees.Where(x => x.DivisionNumber == data).ToList();
            return emp.Select(x => new EmployeeView
            {
                FirstName = x.FirstName,

                LastName = x.LastName
            }).ToList();

        }

        [HttpGet("{id}")]
        public async Task<EmployeeViewModel> Get(int id)
        {
            var data = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
            return _mapper.Map<EmployeeViewModel>(data);
        }

        [HttpGet("date/{month}")]
        public ICollection<DriverEndLicense> getExpiryDate(int month)
        {
            List<DriverEndLicense> dates = new List<DriverEndLicense>();
            var date = _context.DriverLicenses.Join(_context.Employees,
                p => p.EmployeeId,
                c => c.Id,
                (p, c) => new
                {
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    //PersonnelNumber = c.PersonnelNumber,
                    BthDate = c.BthDate,
                    DivisionNumber = c.DivisionNumber.Name,
                    //SerialNumber = p.SerialNumber,
                    //IssueDate = p.IssueDate,
                    ExpiryDate = p.ExpiryDate,
                    //Category = p.Category
                }).Where(p => p.ExpiryDate <= DateTime.Now.AddMonths(month));
            foreach (var item in date)
            {
                dates.Add(new DriverEndLicense()
                {
                    FirstName = item.FirstName.ToString(),
                    LastName = item.LastName.ToString(),
                    DivisionNumber = item.DivisionNumber,
                    BthDate = item.BthDate,
                    //SerialNumber = item.SerialNumber.ToString(),
                    //IssueDate = item.IssueDate,
                    ExpiryDate = item.ExpiryDate,
                    //Category = item.Category,
                    //PersonnelNumber = item.PersonnelNumber
                }) ;
            };
            return  dates;
        }

        [HttpPost]
        public async Task<int> Post([FromBody] EmployeeViewModel model)
        {
            var employee =  _mapper.Map<EmployeeEntity>(model);
            employee.DivisionNumber = _context.Divisions.FirstOrDefault(x => x.Name == model.DivisionNumber);
          
           await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee.Id;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateEmployeeViewModel model)
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
        public async Task<IActionResult> Delete(int id)
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
