using CES.Domain.Models.Request.FuelReport;
using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.FuelReport;
using CES.Domain.Models.Response.Report;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("report/fuel/")]
    [ApiController]
    public class FuelReportController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FuelReportController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("allDivisionsWorkSchedule")]
        [Produces(typeof(CreateCardWorkDivisionDateResponse))]
        public async Task<object> GetAllDivisionsWorkScheduleAsync(string period)
        {
            try
            {
                return await _mediator.Send(new GetAllDivisionsWorkScheduleRequest() { Period = period});
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }

        [HttpGet("getFuelReportInfo")]
        [Produces(typeof(List<GetAllWorkCardsResponse>))]

        public async Task<object> GetAllWorkCardsAsync(int month, int year)
        {
            try
            {
                return await _mediator.Send(new GetAllWorkCardsRequest()
                {
                    Month = month,
                    Year = year,
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

        [HttpPost("divisionWorkSchedule")]
        [Produces(typeof(CreateCardWorkDivisionDateResponse))]
        public async Task<object> CardWorkDivisionDateAsync( CreateCardWorkDivisionDateRequest createCard)
        {
            try
            {
                return await _mediator.Send(createCard);
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }

        [HttpPost("fuelWorkCard")]
        public async Task<StatusCodeResult> UploadingFuelWorkCardAsync(IFormFile file)
        {
            if (file.Length == 0) return await Task.FromResult(StatusCode(404));
            var stream = new FuelWorkCardRequest
            {
                FuelWorkCardFile = file,
            };
            var res = await _mediator.Send(stream);
            return await Task.FromResult(StatusCode(res));
        }

        [HttpDelete("deleteDivisionWorkSchedule")]
        [Produces(typeof(int))]
        public async Task<object> DeleteDivisionWorkSchedule(int idDivision)
        {
            try
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                return await _mediator.Send(new DeleteDivisionWorkScheduleRequest() { IdDivison = idDivision});
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }
    }
}
