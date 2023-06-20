using CES.Domain.Models.Response.Mes;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;

namespace CES.Domain.Models.Request.Mes
{
    public class EditNoteRequest : IRequest<EditNoteResponse>
    {
        public int EditId { get; set; }

        public JsonPatchDocument? EditNote { get; set; }
    }
}
