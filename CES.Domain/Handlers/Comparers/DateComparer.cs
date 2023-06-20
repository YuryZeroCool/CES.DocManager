using CES.Infra.Models.Mes;

namespace CES.Domain.Handlers.Comparers
{
    public class DateComparer : IComparer<Object>
    {
        public int Compare(object dateA, object dateB) => DateTime.Compare(((NoteEntity)dateA).Date, ((NoteEntity)dateB).Date);
    }
}
