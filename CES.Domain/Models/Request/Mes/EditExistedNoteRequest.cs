using MediatR;

namespace CES.Domain.Models.Request.Mes
{
    public class EditExistedNoteRequest : Note, IRequest<int>
    {
        public ContactInfoModel[]? NoteContactsInfo { get; set; }
    }
}
