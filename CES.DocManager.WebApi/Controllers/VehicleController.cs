using System.Net;
using CES.DocManager.WebApi.Models;
using CES.Domain.Exception;
using CES.Domain.Models.Request.Vehicle;
using CES.Domain.Models.Response.Vehicle;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CES.DocManager.WebApi.Controllers
{
    [Route("vehicle/")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IMediator _mediator;

        public VehicleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("vehicleCreateBrand")]
        [Produces(typeof(VehicleBrandResponse))]
        public async Task<object> CreateVehicleBrand([FromBody] string brand)
        {
            try
            {
               var res = await _mediator.Send(new CreateVehicleBrandRequest()
                {
                    Brand = brand
                });
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (RestException ex)
            {
                HttpContext.Response.StatusCode = ((int)ex.Code);

                return new
                {
                    ex.Error
                };
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return new { };
            }
        }

        [HttpPost("vehicleCreateModel")]
        [Produces(typeof(VehicleBrandResponse))]
        public async Task<object> CreateVehicleModel([FromBody] string brand)
        {
            try
            {
                var res = await _mediator.Send(new CreateVehicleBrandRequest()
                {
                    Brand = brand
                });
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (RestException ex)
            {
                HttpContext.Response.StatusCode = ((int)ex.Code);

                return new
                {
                    ex.Error
                };
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return new { };
            }
        }
    }
}
