using AutoMapper;
using CES.DocManager.WebApi.Models.Mes;
using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{

    [EnableCors("MyPolicy")]
    [Route("mes/acts/")]
    [ApiController]

    public class ActController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public ActController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet()]
        [Produces(typeof(GetActsResponse))]
        public async Task<object> GetActs(
            string min,
            string max,
            string? organizationType,
            string? filter,
            string? searchValue)
        {
            try
            {
                return await _mediator.Send(new GetActsRequest()
                {
                    Min = DateTimeConverter.ConvertToDateTime(min, "yyyy-MM-dd HH:mm:ss"),
                    Max = DateTimeConverter.ConvertToDateTime(max, "yyyy-MM-dd HH:mm:ss"),
                    OrganizationType = organizationType ?? string.Empty,
                    Filter = filter ?? string.Empty,
                    SearchValue = searchValue ?? string.Empty,
                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("types/actFromFile")]
        [Produces(typeof(IEnumerable<GetActTypesFromFileResponse>))]
        public async Task<object> GetActTypesFromFile()
        {
            try
            {
                return await _mediator.Send(new GetActTypesFromFileRequest());
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("data/actFromFile")]
        [Produces(typeof(string))]
        public async Task<object> GetActDataFromFile([FromQuery] string fileName)
        {
            try
            {
                return await _mediator.Send(new GetActDataFromFileRequest()
                {
                    FileName = fileName
                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost()]
        [Produces(typeof(string))]
        public async Task<object> CreateAct([FromBody] ActViewModel act)
        {
            try
            {
                var res = await _mediator.Send(_mapper.Map<CreateActRequest>(act));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (Exception e)
            {

                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse("Упс! Что-то пошло не так");
            }
        }

        [HttpPut("{id}")]
        [Produces(typeof(Act))]
        public async Task<object> UpdateAct(int id, [FromBody] ActViewModel act)
        {
            try
            {
                var request = _mapper.Map<UpdateActRequest>(act);
                request.ActId = id;
                return await _mediator.Send(request);
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpDelete]
        [Produces(typeof(int))]
        public async Task<object> DeleteAct(int id)
        {
            try
            {
                return await _mediator.Send(new DeleteActRequest()
                {
                    Id = id
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