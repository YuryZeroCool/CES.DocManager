using CES.Domain.Models.Response.Act;
using MediatR;

namespace CES.Domain.Models.Request.Mes.Acts
{
    public class UpdateActRequest : IRequest<Models.Response.Act.Act>
    {
        public int ActId { get; set; }

        public string Organization { get; set; } = string.Empty;

        public string Vehicle { get; set; } = string.Empty;

        public string Driver { set; get; } = string.Empty;

        public DateTime ActAdditionDate { get; set; }

        public string ActType { get; set; } = string.Empty;

        public List<Work>? CompletedWorks { get; set; }

        public List<FullNoteData>? NotesWithoutAct { get; set; }

        public decimal TotalActSumm { get; set; }

        public decimal Vat { get; set; }

        public bool IsSigned { get; set; }

        public int ContractId { get; set; }
    }
}
