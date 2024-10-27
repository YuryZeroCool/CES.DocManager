using AutoMapper;
using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.CommonInfo;
using CES.Domain.Models.Response.CommonInfo;
using MediatR;
using Microsoft.AspNetCore.Cors;
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
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }
    }
}