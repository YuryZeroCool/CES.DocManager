using AutoMapper.Configuration.Conventions;
using CES.DocManager.WebApi.Models;
using CES.Domain.Handlers.Report;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Request.Report;
using CES.Domain.Models.Response.Division;
using CES.Domain.Models.Response.MaterialReport;
using CES.Domain.Models.Response.Report;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Specialized;
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

        [HttpGet("getCardWorkDivisions")]
        [Produces(typeof(List<GetCardWorkDivisionsResponse>))]

        public async Task<object> GetCardWorkDivisonsAsync(int carGarage, string reportPeriod)
        {
            try
            {
                return await _mediator.Send(new GetCardWorkDivisionsRequest()
                {
                    GarageNumber = carGarage,
                    ReportPeriod = reportPeriod,
                });
            }
            catch (Exception)
            {

                return new object();
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

        [HttpDelete("deleteDivsionWorkSchedule")]
        [Produces(typeof(int))]
        public async Task<object> DeleteDivisionWorkScheduleAsync(int IdDivision)
        {
            try
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                return await _mediator.Send(new DeleteDivisionWorkScheduleRequest() { IdDivison =IdDivision});
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }
    }
}
