using AutoMapper;
using CES.DocManager.WebApi.Models;
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
            catch (Microsoft.Data.SqlClient.SqlException)
            {
                HttpContext.Response.StatusCode = (int) HttpStatusCode.NotExtended;

                return new object();
            }
            catch (Exception e)
            {

                HttpContext.Response.StatusCode = (int) HttpStatusCode.NotFound;

                return new
                {
                    statusCode = 404,
                    title = e.Message
                };
            }
        }

        //Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("isPersonalNumber/{personalNumber}")]
        [Produces(typeof(bool))]
        public async Task<object> GetIsPersonalNumber(int personalNumber)
        {
            try
            {
                return await _mediator.Send(new GetIsValidNumberNumberRequest {Id = personalNumber});
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return new object();
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
                    {divisionNumber = divisionNumber});
                return _mapper.Map<IEnumerable<GetEmployeesByDivisionResponse>>(response);
            }
            catch (RestException e)
            {
                HttpContext.Response.StatusCode = (int)e.Code;
                return new
                {
                    errorMessage = e.Error,
                };
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return new object();
            }
        }
        
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("noDriverLicense")]
        public async Task<IEnumerable<GetEmployeesByDivisionResponse>> GetListEmployeesNoDriverLicense()
        {
            try
            {
                return await _mediator.Send(new GetListEmployeesNoDriverLicenseRequest());
            }
            catch (Exception)
            {
                throw;
            }

        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("expiringDriverLicense")]
        public async Task<IEnumerable<GetExpiringDocumentEmployeeResponse>> GetExpiringDriverLicense(int numberMonth)
        {
            try
            {
                return await _mediator.Send(new GetExpiringDocumentEmployeeRequest() { NumberMonth  = numberMonth });
            }
            catch (Exception)
            {

                throw;
            }
        }

       // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("expiringDriverMedicalCertificate")]
        public async Task<IEnumerable<GetExpiringDocumentEmployeeResponse>> GetExpiringDriverMedicalCertificate(int numberMonth)
        {
            try
            {
                return await _mediator.Send(new GetExpiringDocumentEmployeeRequest()
                {
                    NumberMonth = numberMonth,
                    NameDocument = "DriverMedicalCertificate"
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("noDriverMedicalCertificate")]
        public async Task<IEnumerable<GetEmployeesByDivisionResponse>> GetNoMedicalCertificate()
        {
            try
            {
                return await _mediator.Send(new GetNoMedicalCertificateRequest());
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
            }
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("createEmployee")]
        public async Task CreateEmployee([FromBody] CreateEmployeeViewModel model)
        {
            try
            {
                await _mediator.Send(_mapper.Map<CreateEmployeeRequest>(model));
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
