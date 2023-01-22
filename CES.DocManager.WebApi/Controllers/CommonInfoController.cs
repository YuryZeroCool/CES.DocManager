using AutoMapper;
using CES.Domain.Models.Request.CommonInfo;
using CES.Domain.Models.Request.Division;
using CES.Domain.Models.Response.CommonInfo;
using CES.Domain.Models.Response.Division;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("commonInfo/")]
    [ApiController]
    public class CommonInfoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public CommonInfoController(IMediator mediator, IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        [HttpGet("allCommonInfo")]
        [Produces(typeof(IEnumerable<GetAllCommonInfoResponse>))]
        public async Task<object> GetAllCommonInfoAsync()
        {
            try
            {
                return await _mediator.Send(new GetCommonInfoRequest());
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }
    }
}
