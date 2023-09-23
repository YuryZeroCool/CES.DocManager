using AutoMapper;
using CES.DocManager.WebApi.Models.Mes;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Request.Mes.Price;
using CES.Domain.Models.Response.Mes;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("mes/price/")]
    public class PriceController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public PriceController(IMediator mediator, IMapper mapper)
        { 
            _mediator = mediator;
            _mapper = mapper;
        }


        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost()]
        [Produces(typeof(CreateOrganizationResponse))]
        public async Task<object> CreatePriceForAct([FromBody] decimal price )
        {
            try
            {
                var res = await _mediator.Send(new CreatePriceActRequest()
                {
                   Price = price
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
    }
}
