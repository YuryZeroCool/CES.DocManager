﻿using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.DriverLicense;
using CES.Domain.Models.Response.DriverLicense;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("driverLicenses/")]
    [ApiController]
    public class DriverLicensesController : ControllerBase
    {

        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public DriverLicensesController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        //[Authorize(AuthenticationSchemes =
        //    JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("isPersonalSerialNumber/{SerialNumber}")]
        [Produces(typeof(bool))]
        public async Task<object> GetIsPersonalNumber(string serialNumber)
        {
            try
            {
                return await _mediator.Send(new GetIsPersonalSerialNumberRequest() { SerialNumber = serialNumber });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        //[Authorize(AuthenticationSchemes =
        //    JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("createDriverLicense")]
        [Produces(typeof(GetDriverLicenseResponse))]
        public async Task<object> CreateDriverLicenseAsync(CreateDriverLicenseViewModel model)
        {
            try
            {
                var res = await _mediator.Send(_mapper.Map<CreateDriverLicenseViewModel, CreateDriverLicenseRequest>(model));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }
    }
}