using AutoMapper;
using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.Mes.OrganizationTypes;
using CES.Domain.Models.Response.Mes.OrganizationTypes;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("mes/organizationTypes/")]
    [ApiController]

    public class OrganizationTypesController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public OrganizationTypesController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet()]
        [Produces(typeof(List<GetOrganizationTypesResponse>))]
        public async Task<object> GetOrganizationTypes()
        {
            try
            {
                return await _mediator.Send(new GetOrganizationTypesRequest());
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }
    }
}