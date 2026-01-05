using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.DocManager.WebApi.Models.Mes;
using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.Mes.Notes;
using CES.Domain.Models.Response.Mes.Notes;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

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
        [HttpPost]
        [Produces(typeof(CreateNoteRequest))]
        public async Task<object> CreateNote([FromBody] CreateNoteViewModel note)
        {
            try
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return await _mediator.Send(_mapper.Map<CreateNoteRequest>(note));
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
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
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
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
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPut()]
        [Produces(typeof(List<NoteResponse>))]
        public async Task<object> EditExistedNote([FromBody] EditExistedNoteViewModel note)
        {
            try
            {
                var editedNotes = await _mediator.Send(_mapper.Map<EditExistedNoteRequest>(note));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return editedNotes;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        [HttpPost("existedNote")]
        [Produces(typeof(List<NoteResponse>))]
        public async Task<object> CreateExistedNote([FromBody] CreateExistedNoteViewModel note)
        {
            try
            {
                var createdNotes = await _mediator.Send(_mapper.Map<CreateExistedNoteRequest>(note));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return createdNotes;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("withoutAct")]
        [Produces(typeof(List<NotesWithoutActResponse>))]
        public async Task<object> NotesWithoutAct(string min, string max, string? filter, string? searchValue, int page, int limit)
        {
            try
            {
                return await _mediator.Send(new NotesWithoutActRequest()
                {
                    Min = DateTimeConverter.ConvertToDateTime(min.Trim(), "dd-MM-yyyy HH:mm:ss"),
                    Max = DateTimeConverter.ConvertToDateTime(max.Trim(), "dd-MM-yyyy HH:mm:ss"),
                    Page = page,
                    Limit = limit,
                    Filter = !string.IsNullOrEmpty(filter) ? JsonSerializer.Deserialize<string>(filter) : "",
                    SearchValue = searchValue ?? "",
                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpDelete("withoutAct")]
        [Produces(typeof(int))]
        public async Task<object> DeleteNotesWithoutAct(int id)
        {
            try
            {
                return await _mediator.Send(new DeleteNotesWithoutActRequest()
                {
                    Id = id
                });
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
                return new ErrorResponse(e.Message);
            }
        }
    }
}
