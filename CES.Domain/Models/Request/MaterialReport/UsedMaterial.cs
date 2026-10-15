namespace CES.Domain.Models.Request.MaterialReport
{
    public class UsedMaterial : MaterialModelBase
    {
        public int Id { get; set; }

        public string? AccountName { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
