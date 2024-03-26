using MediatR;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class EditExistedNoteRequest : Note, IRequest<int>
    {
        public ContactInfoModel[]? NoteContactsInfo { get; set; }
    }
}
