using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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
        [Produces(typeof(List<GetTotalMaterialsResponse>))]
        public async Task<object> GetTotalMaterialsAsync(string accountsName)
        {
            try
            {
                return await _mediator.Send(new GetTotalMaterialsRequest() { Accounts = accountsName });

            }
            catch (Exception)
            {

                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }

        [HttpGet("allProductsGroupAccount")]
        [Produces(typeof(List<GetAllProductsGroupAccountResponse>))]
        public async Task<object> GetAllProductsGroupAccountAsync()
        {
            try
            {
                return await _mediator.Send(new GetAllProductsGroupAccountRequest());
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
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
