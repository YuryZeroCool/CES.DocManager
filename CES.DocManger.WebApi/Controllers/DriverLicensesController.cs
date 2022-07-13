using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CES.DocManger.WebApi.Models;
using CES.Domain.Models.Request.DriverLicense;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class DriverLicensesController : ControllerBase
    {

        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public DriverLicensesController( IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [Authorize(AuthenticationSchemes =
        JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("isPersonalSerialNumber/{SerialNumber}")]
        public async Task<bool> GetIsPersonalNumber(string SerialNumber)
        {
            try
            {
                return await _mediator.Send(new IsPersonalSerialNumberRequest() { SerialNumber = SerialNumber });
            }
            catch (System.Exception)
            {

                throw;
            }
        }


        [Authorize(AuthenticationSchemes =
        JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost]
        public async Task Post([FromBody] CreateDriverLicenseViewModel model)
        {
            try
            {
                await _mediator.Send(_mapper.Map<CreateDriverLicenseViewModel, CreateDriverLicenseRequest>(model));
            }
            catch (System.Exception)
            {
                throw;
            }
             
        }
    }
}
