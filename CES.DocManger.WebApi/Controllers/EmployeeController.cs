using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using CES.Domain.Models.Response.Employees;
using System;
using CES.Domain.Models.Request.Employee;
using CES.DocManger.WebApi.Models;
using System.Net;

namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public EmployeeController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [Authorize(AuthenticationSchemes =
       JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet]
        [Produces(typeof(IEnumerable<GetEmployeeFullNameResponse>))]
        public async Task<Object> GetAllEmployees()
        {
            try
            {
                var response = await _mediator.Send(new GetEmployeeFullNameRequest());
                return _mapper.Map<IEnumerable<GetEmployeeFullNameResponse>>(response);
            }
            catch (Microsoft.Data.SqlClient.SqlException)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotExtended;

                return null;
            }
            catch (Exception e)
            {

                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;

                return new
                {
                    statusCode = 404,
                    title = e.Message
                };
            }
        }

        [Authorize(AuthenticationSchemes =
            JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("isPersonalNumber/{personalNumber}")]
        public async Task<bool> GetIsPersonalNumber(int personalNumber)
        {
            return await _mediator.Send(new GetIsValidNumberNumberRequest { Id = personalNumber });
        }

        [Authorize(AuthenticationSchemes =
       JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("firstName/{divisionNumber}")]
        public async Task<IEnumerable<GetEmployeeFullNameResponse>> GetShiftEmployees(string divisionNumber)
        {
            try
            {
                var response = await _mediator.Send(new GetEmployeeFullNameRequest() { divisionNumber = divisionNumber });
                return _mapper.Map<IEnumerable<GetEmployeeFullNameResponse>>(response);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Authorize(AuthenticationSchemes =
       JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("noDriverLicense")]
        public async Task<IEnumerable<GetEmployeeFullNameResponse>> GetListEmployeesNoDriverLicense()
        {
            try
            {
                return await _mediator.Send(new ListEmployeesNoDriverLicenseRequest());
            }
            catch (Exception)
            {
                throw;
            }

        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("expiringDriverLicense")]
        public async Task<IEnumerable<ExpiringDocumentEmployeeResponse>> GetExpiringDriverLicense(int numberMonth)
        {
            try
            {
                return await _mediator.Send(new GetExpiringDocumentEmployeeRequest() { numberMonth = numberMonth });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("expiringDriverMedicalCertificate")]
        public async Task<IEnumerable<ExpiringDocumentEmployeeResponse>> GetExpiringDriverMedicalCertificate(int numberMonth)
        {
            try
            {
                return await _mediator.Send(new GetExpiringDocumentEmployeeRequest()
                {
                    numberMonth = numberMonth,
                    nameDocument = "DriverMedicalCertificate"
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Authorize(AuthenticationSchemes =
     JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("noDriverMedicalCertificate")]
        public async Task<IEnumerable<GetEmployeeFullNameResponse>> GetNoMedicalCertificate()
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

        [Authorize(AuthenticationSchemes =
         JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("AllInformationEmployee")]
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

        [Authorize(AuthenticationSchemes =
        JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
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
