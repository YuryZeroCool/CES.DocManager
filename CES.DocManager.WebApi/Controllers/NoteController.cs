using AutoMapper;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Response.Mes;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("mes/note/")]
    [ApiController]

    public class NoteController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public NoteController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet()]
        [Produces(typeof(List<GetAllNotesResponse>))]
        public async Task<object> Acts()
        {
            try
            {
                return await _mediator.Send(new GetAllNotesRequest());
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }

    }
}
