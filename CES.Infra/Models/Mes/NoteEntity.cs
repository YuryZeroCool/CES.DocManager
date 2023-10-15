using System.Text.Json.Serialization;

namespace CES.Infra.Models.Mes
{
    public class NoteEntity
    {
        public int Id { get; set; }

        public string? Address { get; set; }

        public string? Tel { get; set; }

        public DateTime Date { get; set; }

        public int? Meters { get; set; }

        public string? Comment { get; set; }

        public bool IsChecked { get; set; }

        public int? ActId { get; set; }
        [JsonIgnore]
        public ActEntity? Act { get; set; }

        public int? StreetId { get; set; }

        public StreetEntity? Street { get; set; }

        public int? HouseNumberId { get; set; }

        public HouseNumberEntity? HouseNumber { get; set; }
    }
}
