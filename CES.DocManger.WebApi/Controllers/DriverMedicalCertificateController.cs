using AutoMapper;
using CES.DocManger.WebApi.Models.Response.DriverMedicalCertificate;
using CES.Infra;
using CES.Infra.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]

    [Route("api/[controller]")]
    [ApiController]
    public class DriverMedicalCertificateController : ControllerBase
    {
        private readonly DocMangerContex _context;

        private readonly IMapper _mapper;

        public DriverMedicalCertificateController(DocMangerContex context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        [HttpPost]
        public async Task<int> Post([FromBody] DriverMedicalCertificatecView model)
        {
            var license = _mapper.Map<DriverMedicalCertificateEntity>(model);
            license.EmployeeId = _context.Employees
                .FirstOrDefault(x => x.FirstName == model.FirstName && x.LastName == model.LastName).Id;
            await _context.DriverMedicalCertificate.AddAsync(license);
            await _context.SaveChangesAsync();
            return license.Id;
        }

    }
}
