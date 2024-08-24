using CES.Domain.Models.Request.Mes.Acts;

namespace CES.Domain.Models.Response.Act
{
    public class GetActsResponse
    {
        public int TotalActsListPagesCount { get; set; }

        public List<Act> ActsList { get; set; } = new();
    }

    public class Act
    {
        public int Id { get; set; }

        public string ActDateOfCreation { get; set; } = string.Empty;

        public string DateOfWorkCompletion { get; set; } = string.Empty;

        public string Organization { get; set; } = string.Empty;

        public string PayerAccountNumber { get; set; } = string.Empty ;

        public decimal Total { get; set; }

        public string NumberPlateOfCar { get; set; } = string.Empty;

        public decimal Vat { get; set; }

        public string ActType { get; set; } = string.Empty;

        public string Driver { get; set; } = string.Empty;

        public List<Work>? Works { get; set; }

        public List<FullNoteData>? NotesWithoutAct { get; set; }
    }
}
