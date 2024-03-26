using AutoMapper;
using CES.DocManager.WebApi.Models.Mes;
using CES.Domain.Models.Request.Mes.Organization;
using CES.Domain.Models.Response.Mes.Organizations;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("mes/organizations/")]
    [ApiController]

    public class OrganizationController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public OrganizationController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet]
        [Produces(typeof(SearchOrganizationRequest))]
        public async Task<object> SearchOrganizations(string? title = default, int limit = 10, int page = 1)
        {
            try
            {
                return await _mediator.Send(new SearchOrganizationRequest()
                {
                    Title = title,
                    Limit = limit,
                    Page = page
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost]
        [Produces(typeof(CreateOrganizationResponse))]
        public async Task<object> CreateOrganization([FromBody] OrganizationViewModel organization)
        {
            try
            {
                var res = await _mediator.Send(_mapper.Map<CreateOrganizationRequest>(organization));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                if (e.Message == "Такой УНП существует"
                    || e.Message == "Такая организация существует"
                    || e.Message == "Заполните имя организации") return new { e.Message };
                return new { Message = "Упс! Что-то пошло не так" };
            }

        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPut]
        [Produces(typeof(EditOrganizationResponse))]
        public async Task<object> EditOrganization([FromBody] OrganizationViewModel model)
        {
            try
            {
                var id = await _mediator.Send(_mapper.Map<EditOrganizationRequest>(model));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return id;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new { e.Message };
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpDelete]
        [Produces(typeof(int))]
        public async Task<object> DeleteOrganization(int id)
        {
            try
            {
                return await _mediator.Send(new DeleteOrganizationRequest()
                {
                    Id = id
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("searchByTitle")]
        [Produces(typeof(List<string>))]
        public async Task<object> GetOrganizationsBySearch(string? title = default)
        {
            try
            {
                return await _mediator.Send(new OrganizationsBySearchRequest()
                {
                    Title = title,
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
    }
}
