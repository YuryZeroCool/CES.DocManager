using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Request.Men;
using CES.Domain.Models.Response.MaterialReport;
using CES.Domain.Models.Response.Men;
using CES.Domain.Models.Response.Vehicle;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("mes/")]
    public class MesController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public MesController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }


        [HttpPost("noteCreate")]
        [Produces(typeof(AddNoteRequest))]
        public async Task<object> CreateNoteAsync([FromBody] NoteViewModel note)
        {
            try
            {
                var res = await _mediator.Send(_mapper.Map<AddNoteRequest>(note));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return new { };
            }
        }

        [HttpGet("getAllNotes")]
        [Produces(typeof(List<AddNoteRequest>))]
        public async Task<object> GetNote(string text, DateTime min, DateTime max)
        {
            try
            {
                return await _mediator.Send(new GetNotesRequest() 
                {
                   Text = text,
                   Min = min,
                   Max= max
                });
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new object();
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPatch("editNote")]
        [Produces(typeof(EditNoteResponse))]
        public async Task<object> EditNote(int id, [FromBody] JsonPatchDocument editedMaterial)
        {
            try
            {
                return await _mediator.Send(new EditNoteRequest()
                {
                    EditId = id,
                    EditNote = editedMaterial
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
        [HttpDelete("deleteNote")]
        [Produces(typeof(int))]
        public async Task<object> DeleteNote(int id)
        {
            try
            {
                return await _mediator.Send(new DeleteNoteRequest()
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

    }
}
