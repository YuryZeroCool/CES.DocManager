using CES.Domain.Models.Response.Mes.Notes;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class CreateExistedNoteRequest : Note, IRequest<List<NoteResponse>>
    {
        public ContactInfoModel[]? NoteContactsInfo { get; set; }
    }
}
