using CES.Domain.Models.Request.Report;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        public readonly  IMediator _mediator;
        private readonly ILogger<ReportController> _loger;
        IWebHostEnvironment _appEnvironment;

        public ReportController (IMediator mediator, ILogger<ReportController> logger, IWebHostEnvironment appEnvironment)
        {
            _mediator = mediator;
            _loger = logger;
            _appEnvironment = appEnvironment;

        }

        [HttpGet]
        public async Task<IEnumerable<List<string>>> VehicleExpenseSheet()
        {
                var data =  await _mediator.Send(new VehicleExpenseSheetRequest { Path = _appEnvironment.WebRootPath });
           
                return await Task.FromResult(data);
        }

        [HttpPost]
        public async  Task<StatusCodeResult> UploadingFileAsync(IFormFile file)
        {
            if(file != null) 
            {
                var stream = new UploadingRequest
                {
                    Uploading = file,
                    Path = _appEnvironment.WebRootPath
                };
                var res =   await _mediator.Send(stream);
                return await Task.FromResult(StatusCode(res));
            }
            return await Task.FromResult(StatusCode(500));
        } 
    }
}
