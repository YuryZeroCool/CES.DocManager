using CES.Domain.Models.Response.Mes.Notes;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class EditExistedNoteRequest : Note, IRequest<List<NoteResponse>>
    {
        public ContactInfoModel[]? NoteContactsInfo { get; set; }
    }
}
