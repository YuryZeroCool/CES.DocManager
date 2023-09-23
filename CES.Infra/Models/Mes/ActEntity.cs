namespace CES.Infra.Models.Mes
{
    public class ActEntity
    {
        public int Id { get; set; }

        public DateTime ActDateOfCreation { get; set; }

        public DateTime DateOfWorkCompletion { get; set; }

        public int OrganizationId { get; set; }

        public OrganizationEntity Organization { get; set; }

        public ICollection<NoteEntity> Notes { get; set; }

        public ActEntity()
        {
            Notes = new List<NoteEntity>();
        }
    }
}
