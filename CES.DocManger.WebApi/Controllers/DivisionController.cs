using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using CES.Domain.Models.Request.Departments;
using CES.Domain.Models.Response.Departments;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;


namespace CES.DocManger.WebApi.Controllers
{

    [EnableCors("MyPolicy")]
    [ApiController]
    [Route("api/[controller]")]
    public class DivisionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
       
        public DivisionController(IMediator mediator, IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;

        }

        [Authorize(AuthenticationSchemes =
            JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet]
        public async Task<IEnumerable<GetDivisionNumberResponse>> GetAllDivisions()
        {
            return await _mediator.Send(new GetDivisionNumberRequest());
        }
    }
}
