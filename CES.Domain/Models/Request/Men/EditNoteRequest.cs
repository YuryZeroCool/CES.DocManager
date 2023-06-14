using CES.Domain.Models.Response.Men;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;

namespace CES.Domain.Models.Request.Men
{
    public class EditNoteRequest : IRequest<EditNoteResponse>
    {
        public int EditId { get; set; }

        public JsonPatchDocument? EditNote { get; set; }
    }
}
