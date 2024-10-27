using MediatR;

namespace CES.Domain.Models.Request.Mes.Notes
{
    public class CreateExistedNoteRequest : Note, IRequest<string>
    {
        public ContactInfoModel[]? NoteContactsInfo { get; set; }
    }
}
