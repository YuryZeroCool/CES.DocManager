using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using CES.Domain.Models.Response.Employees;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("driverMedicalCertificate/")]
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

        //[Authorize(AuthenticationSchemes =
        //    JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("createMedicalCertificate")]
        [Produces(typeof(GetEmployeesByDivisionResponse))]
        public async Task<object> CreateMedicalCertificate(CreateMedicalCertificateViewModel model)
        {
            try
            {
                return await _mediator.Send(_mapper.Map<CreateMedicalCertificateViewModel, CreateMedicalCertificateRequest>(model));
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }
    }
}
