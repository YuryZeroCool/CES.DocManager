using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.DocManager.WebApi.Models.Mes;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Response.Mes;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using NPOI.OpenXmlFormats.Wordprocessing;
using System.Linq;
using System.Net;
using System.Security.Policy;

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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("noteCreate")]
        [Produces(typeof(AddNoteRequest))]
        public async Task<object> CreateNote([FromBody] NoteViewModel note)
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpGet("getSortedNotes")]
        [Produces(typeof(List<GetSortedNotesResponse>))]
        public async Task<object> GetSortedNotes(string text, DateTime min, DateTime max)
        {
            try
            {
                return await _mediator.Send(new GetSortedNotesRequest() 
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
        [HttpGet("getAllNotes")]
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
        [HttpPut("editExistedNote")]
        [Produces(typeof(int))]
        public async Task<object> EditExistedNote([FromBody] EditExistedNoteViewModel model)
        {
            try
            {
               var  id = await _mediator.Send(_mapper.Map<EditExistedNoteRequest>(model));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return id;
            }
            catch (Exception e)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return new {e.Message} ;
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

        // [Authorize(AuthenticationSchemes =
        //JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("createOrganization")]
        [Produces(typeof(CreateOrganizationResponse))]
        public async Task<object> CreateOrganization([FromBody] OrganizationViewModel organization)
        {
            try
            {
                var res = await _mediator.Send(_mapper.Map<CreateOrganizationRequest>(organization));
                HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
                return res;
            }
            catch (Exception e )
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                if( e.Message == "Такой УНП Существует в базе" 
                    || e.Message == "Такая организация существует в базе" 
                    || e.Message == "Заполните имя организации") return new { e.Message };
                return new { Message = "Упс! Что-то пошло не так" };
            }
            
        }
    }
}
