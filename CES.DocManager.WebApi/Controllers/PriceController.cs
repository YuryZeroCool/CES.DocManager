using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.Mes.Price;
using CES.Domain.Models.Response.Mes.Organizations;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("mes/prices/")]
    [ApiController]

    public class PriceController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PriceController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost()]
        [Produces(typeof(CreateOrganizationResponse))]
        public async Task<object> CreatePriceForAct([FromBody] decimal price)
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
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }
    }
}