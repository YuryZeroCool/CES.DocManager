using AutoMapper;
using CES.DocManager.WebApi.Models.Mes;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using CES.Domain.Models.Response.Mes;
using CES.Domain.Models.Response.Mes.Acts;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{

    [EnableCors("MyPolicy")]
    [Route("mes/act")]
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
        [Produces(typeof(List<GetAllNotesResponse>))]
        public async Task<object> Acts()
        {
            try
            {
                return await _mediator.Send(new GetAllNotesRequest());
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
        [Produces(typeof(CreateOrganizationResponse))]
        public async Task<object> CreateWorkNameInAct([FromBody] WorkNameInActViewModel workName)
        {
            try
            {
                var res = await _mediator.Send(new CreateWorkNameInActRequest()
                {
                    Name = workName.Name,
                    Price = workName.Price,
                });
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch 
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return new { Message = "Упс! Что-то пошло не так" };
            }
        }

        [HttpGet("workNameInAct")]
        [Produces(typeof(List<WorkNameInActResponse>))]
        public async Task<object> GetWorkNameInAct()
        {
            try
            {
                return await _mediator.Send(new WorkNameInActRequest());
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }

        [HttpGet("actTypesFromFile")]
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

        [HttpGet("actDataFromFile")]
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
    }
}
