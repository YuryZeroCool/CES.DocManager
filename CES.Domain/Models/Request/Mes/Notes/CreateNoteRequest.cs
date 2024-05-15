using CES.Domain.Models.Response.Mes.Notes;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class CreateNoteRequest : Note, IRequest<CreateNoteResponse>
    { }
}
