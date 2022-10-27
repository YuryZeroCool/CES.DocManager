namespace CES.Infra.Models.MaterialReport
{
    public class DecommissionedMaterialEntity
    {
        public int Id { get; set; }

        public DateTime CurrentDate { get; set; }

        public NumberPlateCarEntity? NumberPlateOfCar { get; set; }

        public int NumberPlateOfCarId { get; set; }

        public CarMechanicEntity? CarMechanic { get; set; }

        public int CarMechanicId { get; set; }


        public byte[]? Materials { get; set; }
    }
}
