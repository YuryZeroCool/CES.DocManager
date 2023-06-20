using CES.Infra.Models;
using CES.Infra.Models.Mes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CES.Infra.Config.Mes
{
    public class NoteConfig : IEntityTypeConfiguration<NoteEntity>
    {
        public void Configure(EntityTypeBuilder<NoteEntity> builder)
        {
                builder.Property(x => x.Date)
                    .HasColumnType("DATETIME"); 
        }
    }
}
