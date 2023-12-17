using CES.Domain.Models.Response.Act;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Acts
{
    public class CreateActRequest : IRequest<CreateActResponse>
    {
        public string Organization { get; set; } = string.Empty;

        public string Vehicle { get; set; } = string.Empty;

        public string Driver { set; get; } = string.Empty;

        public DateTime ActAdditionDate { get; set; }

        public string ActType { get; set; } = string.Empty;

        public List<Work>? CompletedWorks { get; set; }

        public List<FullNoteData>? NotesWithoutAct { get; set; }

        public decimal TotalActSumm { get; set; }

        public decimal Vat { get; set; }
    }

    public class Work
    {
        public string Name { get; set; } = string.Empty;

        public string Unit { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Count { get; set; } = string.Empty;

        public decimal TotalSumm { get; set; }
    }

    public class FullNoteData
    {
        public int Id { get; set; }

        public string Street { get; set; } = string.Empty;

        public decimal Entrance { get; set; }

        public string HouseNumber { get; set; } = string.Empty;

        public string Tel { get; set; } = string.Empty;
    }
}