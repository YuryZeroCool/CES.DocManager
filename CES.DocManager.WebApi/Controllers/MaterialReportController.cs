using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Request.Vehicle;
using CES.Domain.Models.Response.MaterialReport;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.JsonPatch;
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
                if (accountsName == null) throw new Exception("Error");

                var totalMaterils = await _mediator.Send(new GetTotalMaterialsRequest() { Accounts = accountsName });
                if (totalMaterils.Count > 0)
                {
                    var count = (decimal)totalMaterils.Select(p => p.Party!.Select(x => x.Count).Sum()).ToList().Sum();
                    HttpContext.Response.Headers["X-Total-Count"] = count.ToString();
                   
                    var sum = (decimal)totalMaterils.Select(p => p.Party!.Select(x => x.TotalSum).Sum()).ToList().Sum();
                    HttpContext.Response.Headers["X-Total-Sum"] = sum.ToString();
                }
                return totalMaterils;

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
                if (uploadedFile.Length == 0) throw new Exception("Error");
                await _mediator.Send(new AddMaterialReportRequest() { File = uploadedFile });

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
            catch (Exception e)
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
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new
                {
                    message = e.Message
                };
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPatch("editEnshrinedMaterial/{id}")]
        [Produces(typeof(EditEnshrinedMaterialResponse))]
        public async Task<object> EditEnshrinedMaterialAsync([FromRoute] int id, [FromBody] JsonPatchDocument enshrinedMaterial)
        {
            try
            {
                return await _mediator.Send(new EditEnshrinedMaterialRequest()
                {
                    Id = id,
                    EnshrinedMaterial = enshrinedMaterial
                }
                );
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpDelete("deleteDecommissionedMaterial/{MaterialId:int}")]
        [Produces(typeof(int))]
        public async Task<object> DeleteDecommissionedMaterialAsync(int materialId)
        {
            try
            {
                return await _mediator.Send(new DeleteDecommissionedMaterialRequest() { Id = materialId });
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
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
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return e.Message;
            }

        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("actWriteSpares")]
        [Produces(typeof(byte[]))]
        public async Task<object> ActWriteSparesAsync(int month, int year)
        {
            try
            {
                return await _mediator.Send(new ActWriteSparesRequest()
                {
                    Month = month,
                    Year = year,
                    Path = _appEnvironment.WebRootPath

                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new
                {
                    Error = e.Message
                };
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("addUsedMaterial")]
        [Produces(typeof(AddUsedMaterialResponse))]
        public async Task<object> CreateUsedMaterialAsync(AddUsedMaterialRequest material)
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("actUsedMaterials")]
        [Produces(typeof(byte[]))]
        public async Task<object> ActUsedMaterialsAsync(int month, int year)
        {
            try
            {
                return await _mediator.Send(new ActUsedMaterialsRequest()
                {
                    Month = month,
                    Year = year,
                    Path = _appEnvironment.WebRootPath,
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
        [HttpDelete("allDeleteMaterials")]
        [Produces(typeof(int))]
        public async Task<object> DeleteMaterialsAsync()
        {
            try
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                return await _mediator.Send(new AllDeleteMaterialsRequest());
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
        [HttpPatch("editRepair/{repairId}")]
        [Produces(typeof(int))]
        public async Task<object> EditRepairAsync([FromRoute] int repairId, [FromBody] JsonPatchDocument repair)
        {
            try
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                return await _mediator.Send(new EditRepairRequest()
                {
                    RepairId = repairId,
                    Repair = repair
                }
                );
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
        [HttpGet("getEnshrinedByCarMaterial")]
        [Produces(typeof(int))]
        public async Task<object> GetEnshrinedByCarMaterialAync(string model, string numberOfPlate)
        {
            try
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                return await _mediator.Send(new GetEnshrinedByCarMaterialRequest()
                {
                    Model = model,
                    NumberOfPlate = numberOfPlate
                }
                );
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

    }
}
