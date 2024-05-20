using AutoMapper;
using CES.DocManager.WebApi.Models.Mes;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
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
        [Produces(typeof(List<GetActsResponse>))]
        public async Task<object> GetActs(string min, string max, int page, string? filter, string? searchValue, int limit)
        {
            try
            {
                return await _mediator.Send(new GetActsRequest()
                {
                    Min = DateTime.ParseExact(min, "dd/MM/yyyy, HH:mm:ss", CultureInfo.InvariantCulture),
                    Max = DateTime.ParseExact(max, "dd/MM/yyyy, HH:mm:ss", CultureInfo.InvariantCulture),
                    Page = page,
                    Limit = limit,
                    Filter = filter,
                    SearchValue = searchValue,
                });
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
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
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
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
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
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
            catch
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return new { Message = "Упс! Что-то пошло не так" };
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
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new
                {
                    e.Message
                };
            }
        }
    }
}
