using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("report/material/")]
    [ApiController]
    public class MaterialReportController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MaterialReportController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("getTotalMaterials")]
        public async Task<List<GetTotalMaterialsResponse>> GetTotalMaterialsAsync(string AccountName)
        {
            return await _mediator.Send(new GetTotalMaterialsRequest() { Account = "По счету 10.5"}); 
        }

        [HttpPost("materialReport")]
        public async Task<StatusCodeResult> UploadingMaterialReportAsync(IFormFile file)
        {
            if (file.Length == 0) return await Task.FromResult(StatusCode(404));
            await _mediator.Send(new AddMaterialReportRequest() { File = file });
            return await Task.FromResult(StatusCode(404));
        }
    }
}
