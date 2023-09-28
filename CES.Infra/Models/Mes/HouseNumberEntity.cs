namespace CES.Infra.Models.Mes
{
    public class HouseNumberEntity
    {
        public int Id { get; set; }

        public int Number { get; set; }

        public List<StreetEntity> Streets { get; set; } = new();
    }
}
