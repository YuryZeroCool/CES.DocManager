using AutoMapper;
using CES.DocManger.WebApi.Models.Response.DriverLicense;
using CES.Infra;
using CES.Infra.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
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

        [HttpGet("isPersonalSerialNumber/{SerialNumber}")]
        public async Task<bool> GetIsPersonalNumber(string SerialNumber)
        {
            var serialNumber = await _context.DriverLicenses.FirstOrDefaultAsync(x => x.SerialNumber == SerialNumber);
            if (serialNumber != null) return true;
            return false;
        }

        [HttpPost]
        public async Task<int> Post([FromBody] DriverLicense model)
        {
            var license = _mapper.Map<DriverLicenseEntity>(model);
            license.EmployeeId =   _context.Employees
                .FirstOrDefault(x => x.FirstName==model.FirstName &&  x.LastName==model.LastName ).Id;
            await _context.DriverLicenses.AddAsync(license);
             await _context.SaveChangesAsync();
            return license.Id;
        }
    }
}
