using AutoMapper;
using CES.Domain.Models.Request.Mes.Street;
using CES.Domain.Models.Response.Mes.Street;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("mes/streets/")]
    [ApiController]

    public class StreetController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public StreetController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("bySearch")]
        [Produces(typeof(List<string>))]
        public async Task<object> GetStreets(string value)
        {
            try
            {
                var data = await _mediator.Send(new GetStreetsRequest() { Value = value });
                if (data != null)
                {
                    if (data.Count == 0)
                    {
                        HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                        return data;
                    }
                    return data;
                }
                throw new Exception("Error");
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new
                {
                    e.Message
                };
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost]
        [Produces(typeof(CreateStreetResponse))]
        public async Task<object> CreateStreet([FromBody] string street)
        {
            try
            {
                var res = await _mediator.Send(new CreateStreetRequest() { Street = street });
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return new { e.Message };
            }
        }
    }
}
