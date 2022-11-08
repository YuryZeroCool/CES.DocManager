namespace CES.Domain.Models.Response.MaterialReport
{
    public class AddEnshrinedMaterialResponse : MaterialModelBase
    {
        public int Id { get; set; }

        public DateTime DateCreated { get; set; }

        public string? VehicleBrand { get; set; }

        public string? VehicleModel { get; set; }

        public string? NumberPlateCar { get; set; }

        public string? AccountName { get; set; }
    }
}
