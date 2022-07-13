using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CES.DocManger.WebApi.Models;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using MediatR;
using Microsoft.AspNetCore.Cors;
using CES.Domain.Models.Response.Employees;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CES.DocManger.WebApi.Controllers
{
   [EnableCors("MyPolicy")]

    [Route("api/[controller]")]
    [ApiController]
    public class DriverMedicalCertificateController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public DriverMedicalCertificateController(IMediator mediator, IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        [Authorize(AuthenticationSchemes =
  JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost]
        public async Task<GetEmployeeFullNameResponse> CreateMedicalCertificate([FromBody] CreateMedicalCertificateViewModel model)
        {
            try
            {
               return await _mediator.Send(_mapper.Map<CreateMedicalCertificateViewModel, CreateMedicalCertificateRequest>(model));
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}
