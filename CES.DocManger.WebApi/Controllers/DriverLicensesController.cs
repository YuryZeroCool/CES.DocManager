using AutoMapper;
using CES.DocManger.WebApi.Models.Response.DriverLicense;
using CES.DocManger.WebApi.Models.Response.Employees;
using CES.Infra;
using CES.Infra.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CES.DocManger.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverLicensesController : ControllerBase
    {
        private readonly DocMangerContex _context;

        private readonly IMapper _mapper;
        public DriverLicensesController(DocMangerContex context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

       

    //    [HttpPost]
    //    public async Task<int> Post([FromBody] DriverLicense model)
    //    {
    //        var license = _mapper.Map<EmployeeEntity>(model);
    //        var employees = _context.Employees.Where(x => x.FirstName == model.Employee || x.LastName == ).ToList();

    //        await _context.Employees.AddAsync(employee);
    //        await _context.SaveChangesAsync();
    //        return employee.Id;
    //    }

    }
}
