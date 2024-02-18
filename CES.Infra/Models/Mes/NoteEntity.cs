using System.Text.Json.Serialization;

namespace CES.Infra.Models.Mes
{
    public class NoteEntity
    {
        public int Id { get; set; }

        public string? Comment { get; set; }

        public DateTime Date { get; set; }

        public bool IsChecked { get; set; }

        public string? Tel { get; set; }

        public int? StreetId { get; set; }

        public StreetEntity? Street { get; set; }

        public int? HouseNumberId { get; set; }

        public HouseNumberEntity? HouseNumber { get; set; }

        public int? EntranceId { get; set; }

        public EntranceEntity? Entrance { get; set; }
    }
}
