﻿using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.DocManager.WebApi.Models.Mes;
using CES.Domain.Models.Request.Mes.Notes;
using CES.Domain.Models.Response.Mes.Notes;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("mes/notes/")]
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
        public async Task<object> GetAllNotes()
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost]
        [Produces(typeof(CreateNoteRequest))]
        public async Task<object> CreateNote([FromBody] CreateNoteViewModel note)
        {
            try
            {
                var res = await _mediator.Send(_mapper.Map<CreateNoteRequest>(note));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (Exception)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return new { };
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPatch]
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
        [HttpDelete]
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("sortedNotes")]
        [Produces(typeof(List<GetSortedNotesResponse>))]
        public async Task<object> GetSortedNotes(string text, DateTime min, DateTime max)
        {
            try
            {
                return await _mediator.Send(new GetSortedNotesRequest()
                {
                    Text = text,
                    Min = min,
                    Max = max
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
        [HttpPut()]
        [Produces(typeof(int))]
        public async Task<object> EditExistedNote([FromBody] EditExistedNoteViewModel note)
        {
            try
            {
                var id = await _mediator.Send(_mapper.Map<EditExistedNoteRequest>(note));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return id;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new { e.Message };
            }
        }

        [HttpPost("existedNote")]
        [Produces(typeof(string))]
        public async Task<object> CreateExistedNote([FromBody] CreateExistedNoteViewModel note)
        {
            try
            {
                var status = await _mediator.Send(_mapper.Map<CreateExistedNoteRequest>(note));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return status;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new { e.Message };
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("withoutAct")]
        [Produces(typeof(List<NotesWithoutActResponse>))]
        public async Task<object> NotesWithoutAct()
        {
            try
            {
                return await _mediator.Send(new NotesWithoutActRequest());
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
