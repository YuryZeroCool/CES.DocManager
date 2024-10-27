using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.Vehicle;
using CES.Domain.Models.Response.Vehicle;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("vehicle/")]
    [ApiController]

    public class VehicleController : ControllerBase
    {
        private readonly IMediator _mediator;

        public VehicleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("getAllBrands")]
        [Produces(typeof(IEnumerator<GetAllBrandsResponse>))]
        public async Task<object> GetAllBrandsAsync()
        {
            try
            {
                return await _mediator.Send(new GetAllBransRequest());
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        [HttpGet("getNumbersPlateOfCar")]
        [Produces(typeof(IEnumerator<GetAllNumbersPlateResponse>))]
        public async Task<object> GetNumbersPlateOfCarAsync(string brand)
        {
            try
            {
                return await _mediator.Send(new GetAllNumbersPalteRequest()
                {
                    Brand = brand
                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        [HttpPost("vehicleCreateBrand")]
        [Produces(typeof(GetVehicleBrandResponse))]
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
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        [HttpPost("vehicleCreateModel")]
        [Produces(typeof(GetVehicleBrandResponse))]
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
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("getCarByCarNumber")]
        [Produces(typeof(List<string>))]
        public async Task<object> GetCarByCarNumber(string? carNumber = default)
        {
            try
            {
                if (string.IsNullOrEmpty(carNumber)) return new List<string>();
                return await _mediator.Send(new GetCarByCarNumberRequest()
                {
                    CarNumber = carNumber,
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