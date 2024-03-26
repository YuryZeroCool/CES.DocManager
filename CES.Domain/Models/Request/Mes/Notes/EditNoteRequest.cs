using CES.Domain.Models.Response.Mes.Notes;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class EditNoteRequest : IRequest<EditNoteResponse>
    {
        public int EditId { get; set; }

        public JsonPatchDocument? EditNote { get; set; }
    }
}
