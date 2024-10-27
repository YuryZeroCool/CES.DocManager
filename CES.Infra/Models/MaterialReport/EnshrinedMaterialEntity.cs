namespace CES.Infra.Models.MaterialReport
{
    public class EnshrinedMaterialEntity
    {
        public int Id { get; set; }

        public string? NameMaterial { get; set; }

        public string? NameParty { get; set; }

        public DateTime PartyDate { get; set; }

        public string? Unit { get; set; }

        public decimal Price { get; set; }

        public double Count { get; set; }

        public DateTime DateCreated { get; set; }

        public string? VehicleBrand { get; set; }

        public string? VehicleModel { get; set; }

        public string? NumberPlateCar { get; set; }

        public string? AccountName { get; set; }
    }
}
