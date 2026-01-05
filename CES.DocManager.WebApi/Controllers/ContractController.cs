using AutoMapper;
using CES.DocManager.WebApi.Models.Mes;
using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.Mes.Contracts;
using CES.Domain.Models.Request.Mes.Organization;
using CES.Domain.Models.Response.Mes.Contracts;
using CES.Domain.Models.Response.Mes.Organizations;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("mes/contracts/")]
    [ApiController]

    public class ContractController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public ContractController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpPost]
        [Produces(typeof(CreateContractResponse))]
        public async Task<object> CreateContract([FromBody] ContractViewModel contract)
        {
            try
            {
                var res = await _mediator.Send(_mapper.Map<CreateContractRequest>(contract));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }
    }
}
