using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using File = System.IO.File;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("report/material/")]
    [ApiController]
    public class MaterialReportController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IWebHostEnvironment _appEnvironment;

        public MaterialReportController(IMediator mediator, IWebHostEnvironment appEnvironment)
        {
            _mediator = mediator;
            _appEnvironment = appEnvironment;
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

       // [Authorize(AuthenticationSchemes =
       //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("materialReport")]
        public async Task<string> UploadingMaterialReportAsync(IFormFile uploadedFile)
        {
            try
            {
                if (uploadedFile.Length == 0) throw new Exception("Error") ;
                // await _mediator.Send(new AddMaterialReportRequest() { File = file });

                if (uploadedFile != null)
                {
                    // путь к папке Files
                    string path = _appEnvironment.WebRootPath + "/download/" + uploadedFile.FileName;
                    // сохраняем файл в папку Files в каталоге wwwroot
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        await uploadedFile.CopyToAsync(fileStream);
                    }
                }
                HttpContext.Response.StatusCode = 200;

                return await Task.FromResult("Файл успешно записан");
            }
            catch (Exception )
            {
                HttpContext.Response.StatusCode = 500;

                return await Task.FromResult("Произошка ошибка при запими файла");
            }
         
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("getAllEnshrinedMaterial")]
        [Produces(typeof(List<GetAllEnshrinedMaterialResponse>))]
        public async Task<object> GetAllEnshrinedMaterialAsync()
        {
            try
            {
                return await _mediator.Send(new GetAllEnshrinedMaterialRequest());
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("addEnshrinedMaterial")]
        [Produces(typeof(AddEnshrinedMaterialResponse))]
        public async Task<object> AAddEnshrinedMaterialAsync(AddEnshrinedMaterialRequest material)
        {
            try
            {
                return await _mediator.Send(material);
            }
            catch (Exception e)
            {

                return new
                {
                    message = e.Message
                };
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpDelete("deleteEnshrinedMaterial/{MaterialId:int}")]
        [Produces(typeof(int))]
        public async Task<object> DeleteEnshrinedMaterialAsync(int MaterialId)
        {
            try
            {
                return await _mediator.Send(new DeleteEnshrinedMaterialRequest()
                {
                    MaterialId = MaterialId
                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new
                {
                    Message = e.Message
                };
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpDelete("deleteMaterial/{materialId:int}")]
        [Produces(typeof(int))]
        public async Task<object> DeleteMaterialAsync(int materialId)
        {
            try
            {
                return await _mediator.Send(new DeleteMaterialRequest()
                {
                    MaterialId = materialId
                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new
                {
                    Message = e.Message
                };
            }
        }

        [HttpPost("addDecommissionedMaterial")]
        [Produces(typeof(AddDecommissionedMaterialResponse))]
        public async Task<object> AddDecommissionedMaterialAsync(AddDecommissionedMaterialRequest material)
        {
            try
            {
                return await _mediator.Send(material);
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new
                {
                    Message = e.Message
                };
            }
        }

        [HttpDelete("deleteDecommissionedMaterial/{MaterialId:int}")]
        [Produces(typeof(int))]
        public async Task<object> DeleteDecommissionedMaterialAsync(int materialId)
        {
            try
            {
               return await _mediator.Send(new DeleteDecommissionedMaterialRequest() { Id = materialId});
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new
                {
                    Message = e.Message
                };
            }
        }

        [HttpGet("getAllDecommissionedMaterials")]
        [Produces(typeof(List<GetAllDecommissionedMaterialsResponse>))]
        public async Task<object> GetAllDecommissionedMaterialsAsync()
        {
            try
            {
                return await _mediator.Send(new GetAllDecommissionedMaterialsRequest());
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new
                {
                    Message = e.Message
                };
            }
        }

        [HttpGet("getDefectiveSheet")]
        public async Task<string> GetDefectiveSheetAsync(int id)
        {
            try
            {
                return await _mediator.Send(new GetDefectiveSheetRequest()
                {
                    Path = _appEnvironment.WebRootPath,
                    Id = id
                });
            }
            catch (Exception e)
            {
                return e.Message;
            }
           
        }


        [HttpGet("actWriteSpares")]
        [Produces(typeof(List<GetAllDecommissionedMaterialsResponse>))]
        public async Task<object> ActWriteSparesAsync(int period)
        {
            try
            {
               return await _mediator.Send(new ActWriteSparesRequest()
               { 
                    Date = period,

                    Path = _appEnvironment.WebRootPath
               
               });
                //return null;
            }
            catch (Exception e)
            {

                return new
                {
                    Error = e.Message
                };
            }
        }

    }
}
