using AutoMapper;
using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.CarMechanic;
using CES.Domain.Models.Response.CarMechanic;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("carMechanic/")]
    [ApiController]
    public class CarMechanicController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IMediator _mediator;

        public CarMechanicController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        //[Authorize(AuthenticationSchemes =
        //  JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("allCarMechanics")]
        [Produces(typeof(IEnumerable<GetAllCarMechanicResponse>))]
        public async Task<object> GetAllCarMechanicsAsync()
        {
            try
            {
                return await _mediator.Send(new GetAllCarMechanicRequest());
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }
    }
}