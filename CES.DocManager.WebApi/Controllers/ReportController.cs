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
    [Route("report/")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IWebHostEnvironment _appEnvironment;

        public ReportController(IMediator mediator, IWebHostEnvironment appEnvironment)
        {
            _mediator = mediator;
            _appEnvironment = appEnvironment;
        }

        //[HttpGet("vehicleExpenseSheet")]
        //public async Task<IEnumerable<List<GetVehicleExpenseSheetResponse>>> VehicleExpenseSheet()
        //{ 
        //    var data = await _mediator.Send(new GetVehicleExpenseSheetRequest { Path = _appEnvironment.WebRootPath });

        //    return await Task.FromResult(data);
        //}

        [HttpGet("getTotal")]
        public async Task<GetTotalProductResponse> GetTotalAsync()
        { 
            return await _mediator.Send(new GetTotalProductRequest());
        }

        [HttpGet("getCardWorkDivisions")]
        public async Task<List<Model>> GetCardWorkDivisonsAsync(int carGarage, DateTime reportPeriod)
        {
            
            return await _mediator.Send(new GetCardWorkDivisionsRequest()
             {
                GarageNumber = carGarage,
                ReportPeriod = new DateTime(2022,8,1),
             });
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

        [HttpPost("materialReport")]
        public async Task<StatusCodeResult> UploadingMaterialReportAsync(IFormFile file)
        {
            if (file.Length == 0) return await Task.FromResult(StatusCode(404));
            var res = await _mediator.Send( new AddMaterialReportRequest() {File = file });
            return await Task.FromResult(StatusCode(404));
        }
    }
}
