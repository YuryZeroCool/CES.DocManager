using AutoMapper;
using CES.DocManager.WebApi.Services;
using CES.Domain.Exception;
using CES.Domain.Models.Request.Division;
using CES.Domain.Models.Response.Division;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("division/")]
    [ApiController]
    public class DivisionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public DivisionController(IMediator mediator, IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;

        }

        //[Authorize(AuthenticationSchemes =
        //   JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("divisions")]
        [Produces(typeof(IEnumerable<GetDivisionNumbersResponse>))]
        public async Task<object> GetAllDivisions()
        {
            try
            {
                return await _mediator.Send(new GetDivisionNumbersRequest());
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        //[Authorize(AuthenticationSchemes =
        //    JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("createDivision")]
        [Produces(typeof(GetDivisionNumbersResponse))]
        public async Task<object> CreateDivision([FromBody] string divisionName)
        {
            try
            {
                var res = await _mediator.Send(new CreateDivisionRequest()
                {
                    DivisionName = divisionName
                });
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
