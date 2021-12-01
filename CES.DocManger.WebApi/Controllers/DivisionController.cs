using AutoMapper;
using CES.DocManger.WebApi.Models.Response;
using CES.DocManger.WebApi.Security;
using CES.Infra;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CES.DocManger.WebApi.Models;
using CES.Domain.Models.Request.Departments;
using CES.Domain.Models.Response.Departments;
using MediatR;


namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]

    [ApiController]
    //[Authorize(Roles = "admin")]
    public class DivisionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public DivisionController(IMediator mediator, IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;

        }

        [HttpGet]
        public async Task<IEnumerable<GetDivisionNumberResponse>> GetAllDivisions()
        {
            return await _mediator.Send(new GetDivisionNumberRequest());
        }
    }
}
