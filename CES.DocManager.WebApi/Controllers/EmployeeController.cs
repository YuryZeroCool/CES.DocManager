using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.DocManager.WebApi.Services;
using CES.Domain.Exception;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Employees;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("employee/")]
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

        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet]
        [Produces(typeof(IEnumerable<GetEmployeesByDivisionResponse>))]
        public async Task<object> GetAllEmployees()
        {
            try
            {
                var response = await _mediator.Send(new GetEmployeesByDivisionRequest());
                return _mapper.Map<IEnumerable<GetEmployeesByDivisionResponse>>(response);
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        //Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("isPersonalNumber/{personalNumber}")]
        [Produces(typeof(bool))]
        public async Task<object> GetIsPersonalNumber(int personalNumber)
        {
            try
            {
                return await _mediator.Send(new GetIsValidNumberNumberRequest { Id = personalNumber });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("getEmployeesByDivision/{divisionNumber}")]
        [Produces(typeof(IEnumerable<GetEmployeesByDivisionResponse>))]
        public async Task<object> GetEmployeesByDivision(string divisionNumber)
        {
            try
            {
                var response = await _mediator.Send(new GetEmployeesByDivisionRequest()
                { DivisionNumber = divisionNumber });
                return _mapper.Map<IEnumerable<GetEmployeesByDivisionResponse>>(response);
            }
            catch (RestException e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return new object();
            }
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("noDriverLicense")]
        [Produces(typeof(IEnumerable<GetEmployeesByDivisionResponse>))]
        public async Task<object> GetListEmployeesNoDriverLicense()
        {
            try
            {
                return await _mediator.Send(new GetListEmployeesNoDriverLicenseRequest());
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("expiringDriverLicense")]
        [Produces(typeof(IEnumerable<GetExpiringDocumentEmployeeResponse>))]
        public async Task<object> GetExpiringDriverLicense(int numberMonth)
        {
            try
            {
                return await _mediator.Send(new GetExpiringDocumentEmployeeRequest() { NumberMonth = numberMonth });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("expiringDriverMedicalCertificate")]
        [Produces(typeof(IEnumerable<GetExpiringDocumentEmployeeResponse>))]
        public async Task<object> GetExpiringDriverMedicalCertificate(int numberMonth)
        {
            try
            {
                return await _mediator.Send(new GetExpiringDocumentEmployeeRequest()
                {
                    NumberMonth = numberMonth,
                    NameDocument = "DriverMedicalCertificate"
                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("noDriverMedicalCertificate")]
        [Produces(typeof(IEnumerable<GetEmployeesByDivisionResponse>))]

        public async Task<object> GetNoMedicalCertificate()
        {
            try
            {
                return await _mediator.Send(new GetNoMedicalCertificateRequest());
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("allInformationEmployee")]

        public async Task<object> GetAllInformationEmployee([FromQuery()] GetEmployeeViewModel model)
        {
            try
            {
                return await _mediator.Send(_mapper.Map<GetAllInformationEmployeeRequest>(model));
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("createEmployee")]
        [Produces(typeof(CreateEmployeeResponse))]

        public async Task<object> CreateEmployee(CreateEmployeeViewModel model)
        {
            try
            {
                return await _mediator.Send(_mapper.Map<CreateEmployeeRequest>(model));
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("getEmployeeByCarNumber")]
        [Produces(typeof(List<string>))]
        public async Task<object> getEmployeeByCarNumber(string? carNumber = default)
        {
            try
            {
                return await _mediator.Send(new GetEmployeeByCarNumberRequest()
                {
                    CarNumber = carNumber,
                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }
    }
}