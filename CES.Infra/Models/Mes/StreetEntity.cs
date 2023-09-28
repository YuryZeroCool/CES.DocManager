namespace CES.Infra.Models.Mes
{
    public class StreetEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<HouseNumberEntity> HouseNumbers { get; set; } = new();
    }
}
